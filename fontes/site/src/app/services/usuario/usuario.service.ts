import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel, UserloginResponse } from 'src/app/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    apiUrl: string = `${environment.API_URL}/Usuario/Autenticar`;
    constructor(
        private httpClient: HttpClient
    ) { }

    authenticate(): Promise<UserloginResponse> {
        const login: LoginModel = new LoginModel({
            nomeUsuario: environment.API_USER,
            senha: environment.API_PASSWORD
        });
        return this.httpClient.post<UserloginResponse>(this.apiUrl, login).toPromise();
    }
}
