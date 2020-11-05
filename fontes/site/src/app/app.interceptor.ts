import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable, throwError, from } from "rxjs";
import { catchError, retry, switchMap, timeout, } from "rxjs/operators";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest, HttpErrorResponse
} from "@angular/common/http";
import { UsuarioService } from './services';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/utils/local-storage';
import { DefaultErrors } from './models';
import { Platform } from '@angular/cdk/platform';
import { isPlatformServer } from '@angular/common';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    private token: string = '';
    private retried: boolean = false;
    private retryTimes: number = 2;
    private timeout: number = 3000;
    private isServer: boolean = false;
    constructor(
        private usuarioService: UsuarioService,
        private localStorageService: LocalStorageService,
        @Inject(PLATFORM_ID) private platformId: Platform
    ) {
        this.isServer = isPlatformServer(this.platformId);

        if (this.isServer) {
            this.retryTimes = 0;
            this.timeout = 1000;
        }
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (request.url != environment.API_URL + '/Usuario/Autenticar') {
            this.retried = false;
            return this.authFunction(request, next, this.retryTimes);
        } else {
            return next.handle(request)
                .pipe(
                    timeout(this.timeout),
                    retry(this.retryTimes)
                );
        }
    }

    authFunction(request: HttpRequest<any>,
        next: HttpHandler, retryTimes: number) {
        return from(
            this.getToken()).pipe(
                timeout(this.timeout),
                switchMap((token) => {
                    if (token) {
                        request = request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${token}`,
                                Custom: 'institucional'
                            }
                        });
                        return next.handle(request)
                            .pipe(
                                timeout(this.timeout),
                                retry(retryTimes),
                                catchError((error: HttpErrorResponse) => {
                                    let errorMessage = '';
                                    if (error.error instanceof ErrorEvent) {
                                        // client-side error
                                        errorMessage = `Error: ${error.error.message}`;
                                        return throwError(
                                            new DefaultErrors({
                                                message: errorMessage
                                            })
                                        );
                                    } else {

                                        /*
                                            Caso dê não autorizado ele revova o token e tenta novamente.
                                        */
                                        if (error.status === 401) {
                                            this.localStorageService.removeItem('token');
                                            if (!this.retried) {
                                                this.retried = true;
                                                return this.authFunction(request, next, 1)
                                            } else {
                                                return throwError(
                                                    new DefaultErrors({
                                                        message: 'Falha ao se conectar com o servidor.'
                                                    })
                                                );
                                            }
                                        } else {
                                            return throwError(error);
                                        }
                                    }

                                })
                            );
                    } else {
                        return throwError(new DefaultErrors({
                            message: 'Falha ao se conectar com o servidor.'
                        }))
                    }
                }))
    }


    private async getToken() {
        try {
            this.token = this.localStorageService.getItem('token');
            if (!this.token || this.token == '' || this.token == null) {
                const userLoginResponse = await this.usuarioService.authenticate();
                this.localStorageService.setItem('token', userLoginResponse.token);
                this.token = userLoginResponse.token;
                return this.token;
            } else {
                return this.token;
            }
        } catch (error) {
            return '';
        }
    }
}
