import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly API_ENDPOINT = environment.API + '/Dashboard';

  constructor(
    private http: HttpClient
  ) { }

  getUsuariosAtivos() {
    return this.http.get<string>(this.API_ENDPOINT + 'usuario-ativo');
  }

  getBannerAtivos() {
    return this.http.get<string>(this.API_ENDPOINT + 'banner-ativo');
  }

  getPostsAtivos() {
    return this.http.get<string>(this.API_ENDPOINT + 'post-ativo');
  }

  getPostsMaisLidos() {
    return this.http.get<any[]>(this.API_ENDPOINT + 'posts-mais-lidos');
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
