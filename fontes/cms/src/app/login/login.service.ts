import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginModel } from 'src/models/login.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'http://52.3.44.106:8081/Usuario'; 

  constructor(
    private http: HttpClient
  ) { }

  login(loginModel: LoginModel) {
    return this.http.post<UserAuthenticateModel>(this.url + '/Autenticar', loginModel)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
