import { Injectable } from "@angular/core";
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


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(
        private usuarioService: UsuarioService,
        private localStorageService: LocalStorageService
    ) { }
    private token: string = '';
    private retried: boolean = false;

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (request.url != environment.API_URL + '/Usuario/Autenticar') {
            this.retried = false;
            return this.authFunction(request, next, 2);
        } else {
            return next.handle(request)
                .pipe(
                    retry(2)
                );
        }
    }

    authFunction(request: HttpRequest<any>,
        next: HttpHandler, retryTimes: number) {
        return from(this.getToken()).pipe(
            switchMap((token) => {
                if (token) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    return next.handle(request)
                        .pipe(
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
                return this.token
            }
        } catch (error) {
            return ''
        }
    }
}
