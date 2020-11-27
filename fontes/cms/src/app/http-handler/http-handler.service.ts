import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const usuario = this.authenticationService.state;

    // if (usuario) {
      const reqAuth = req.clone({
        setHeaders: {
            'Authorization': 'Bearer ' + usuario.token,
            "Custom": "instadministrativo"
        }
      });
      return next.handle(reqAuth);
    // }

    return next.handle(req).pipe(
      // catchError((error) => {
      //   console.log(error);
      //   return throwError(error);
      // })
    );
  }
}
