import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable, from } from "rxjs";
import { retry, switchMap, timeout, } from "rxjs/operators";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from "@angular/common/http";
import { UsuarioService } from './services';
import { environment } from 'src/environments/environment';
import { Platform } from '@angular/cdk/platform';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    private token: string = '';
    private retried: boolean = false;
    private retryTimes: number = 2;
    private timeout: number = 5000;
    private isServer: boolean = false;
    constructor(
        private usuarioService: UsuarioService,
        @Inject(PLATFORM_ID) private platformId: Platform
    ) {
        this.isServer = isPlatformServer(this.platformId);

        if (this.isServer) {
            this.retryTimes = 0;
            this.timeout = 3000;
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
                        return next.handle(request)
                            .pipe(
                                timeout(this.timeout),
                                retry(this.retryTimes)
                            );
                    }))
        }
    }

    private async getToken() {
        try {
            const userLoginResponse = await this.usuarioService.authenticate();
            this.token = userLoginResponse.token;
            return this.token;
        } catch (error) {
            throw error
        }
    }
}
