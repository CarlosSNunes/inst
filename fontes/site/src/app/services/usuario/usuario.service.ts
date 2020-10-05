import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel, UserloginResponse } from 'src/app/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    apiUrl: string = `${environment.API_URL}/Usuario/Autenticar`;
    constructor(
        private httpClient: HttpClient
    ) { }

    authenticate(login: LoginModel): Observable<UserloginResponse> {
        return this.httpClient.post<UserloginResponse>(this.apiUrl, login);
    }
}
