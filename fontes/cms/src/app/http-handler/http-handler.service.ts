import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const usuario = this.authenticationService.state;

    if (usuario) {
      const reqAuth = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + usuario.token)
      });
      return next.handle(reqAuth);
    }

    return next.handle(req).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }
}
