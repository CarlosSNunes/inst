import { Injectable, EventEmitter } from '@angular/core';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'user_token';
  private usuario: UserAuthenticateModel = this.retrieveToken();
  usuarioChanged: EventEmitter<UserAuthenticateModel> = new EventEmitter();

  private retrieve() {
    const storedToken: string = localStorage.getItem(this.tokenKey);
    return storedToken;
  }

  public retrieveToken(): UserAuthenticateModel {
    const storedUser = JSON.parse(this.retrieve());

    if (storedUser) {
      return new UserAuthenticateModel(storedUser);
    }

    return storedUser;
  }

  set state(usuario: UserAuthenticateModel | null) {
    if (!usuario) {
      localStorage.removeItem(this.tokenKey);
    } else {
      localStorage.setItem(this.tokenKey, JSON.stringify(usuario));
    }

    this.usuario = usuario;
    this.usuarioChanged.emit(this.usuario);
  }

  get state(): UserAuthenticateModel {
    return this.usuario;
  }
}
