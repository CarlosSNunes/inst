import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class HttpHandlerService implements HttpInterceptor {

    constructor() { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token;
        if (localStorage.getItem('user_token')) {
            token = JSON.parse(localStorage.getItem('user_token'));
        }

        const reqAuth = req.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + (token ? token.token : undefined),
                "Custom": "instadministrativo"
            }
        });
        return next.handle(reqAuth);
    }
}
