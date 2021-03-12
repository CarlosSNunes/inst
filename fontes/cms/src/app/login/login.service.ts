import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginModel } from './../../../src/models/login.model';
import { throwError } from 'rxjs';
import { UserAuthenticateModel } from './../../../src/models/user-authenticate.model';
import { environment } from './../../environments/environment';
import { UserWaitingApprovalModel } from 'src/models/usuario/user-waiting-approval.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private readonly API_ENDPOINT = environment.API + '/Usuario';

  constructor(
    private http: HttpClient
  ) { }

 async login(loginModel: LoginModel) {
    return this.http.post<UserAuthenticateModel | UserWaitingApprovalModel>(this.API_ENDPOINT + '/Autenticar', loginModel).toPromise();
      // .pipe(catchError(this.errorHandler));
  }

//   generateUserRequisition(usuario: UsuarioCreateModel) {
//     return this.http.post<UsuarioCreateModel>(this.API_ENDPOINT, usuario);
// }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error);
  }

}
