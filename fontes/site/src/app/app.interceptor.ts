import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable, from, of, throwError } from "rxjs";
import { catchError, retry, switchMap, tap, timeout, } from "rxjs/operators";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpHeaders
} from "@angular/common/http";
import { UsuarioService } from './services';
import { environment } from 'src/environments/environment';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from "@angular/platform-browser";
const STATE_KEY_PREFIX = 'http_requests:';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LocalStorageService } from "src/utils/local-storage";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    private token: string = '';
    private retried: boolean = false;
    private retryTimes: number = 2;
    private timeout: number = 5000;
    private isServer: boolean = false;
    constructor(
        private usuarioService: UsuarioService,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private transferState: TransferState,
        private localStorageService: LocalStorageService
    ) {
        this.isServer = isPlatformServer(this.platformId);

        if (this.isServer) {
            this.retryTimes = 0;
            this.timeout = 25000;
        }
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (request.url == environment.API_URL + '/Usuario/Autenticar/Site') {
            request = request.clone({
                setHeaders: {
                    Custom: 'institucional'
                }
            });
            return next.handle(request)
                .pipe(
                    timeout(this.timeout),
                    retry(this.retryTimes)
                );
        } else {
            return from(
                this.getToken()).pipe(
                    timeout(this.timeout),
                    switchMap((token) => {

                        request = request.clone({
                            setHeaders: {
                                Custom: 'institucional',
                                Authorization: `Bearer ${token}`
                            }
                        });
                        if (request.method !== 'GET') {

                            return next.handle(request)
                                .pipe(
                                    timeout(this.timeout),
                                    retry(this.retryTimes),
                                    catchError((error) => {
                                        this.localStorageService.removeItem('token');
                                        return throwError(error);
                                    })
                                );

                        }
                        const key = makeStateKey<HttpResponse<object>>(STATE_KEY_PREFIX + request.url);

                        if (isPlatformBrowser(this.platformId)) {
                            // Try reusing transferred response from server
                            const cachedResponse = this.transferState.get(key, null);
                            if (cachedResponse) {
                                this.transferState.remove(key); // cached response should be used for the very first time
                                return of(new HttpResponse<any>({
                                    body: cachedResponse.body,
                                    status: 200,
                                    statusText: 'OK (from server)',
                                    // headers are not transferred by current implementation.
                                }));
                            }
                            return next.handle(request).pipe(
                                timeout(this.timeout),
                                retry(this.retryTimes),
                                catchError((error) => {
                                    this.localStorageService.removeItem('token');
                                    return throwError(error);
                                })
                            );
                        }

                        if (isPlatformServer(this.platformId)) {
                            // Try saving response to be transferred to browser
                            return next.handle(request).pipe(
                                tap(event => {
                                    if (event instanceof HttpResponse && event.status == 200) {
                                        // Only body is preserved as it is and it seems sufficient for now. 
                                        // It would be nice to transfer whole response, but http response is not
                                        // a POJO and it needs custom serialization/deserialization.
                                        const response = {
                                            body: event.body
                                        };
                                        this.transferState.set(key, response);
                                    }
                                }),
                                catchError((error: HttpEvent<any>) => {
                                    this.localStorageService.removeItem('token');
                                    return throwError(error);
                                }));
                        }
                    }))
        }
    }

    private async getToken() {
        const jwtHelper = new JwtHelperService();
        try {
            const token = this.localStorageService.getItem('token');

            if (token && token != '' && token != null && !jwtHelper.isTokenExpired(token)) {
                return token;
            } else {
                const userLoginResponse = await this.usuarioService.authenticate();
                this.token = userLoginResponse.token;
                this.localStorageService.setItem('token', userLoginResponse.token);
            }

            return this.token;
        } catch (error) {
            throw error
        }
    }
}
