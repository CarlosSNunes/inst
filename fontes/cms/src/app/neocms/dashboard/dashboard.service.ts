import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = 'http://52.3.44.106:8081/Dashboard/';

  constructor(
    private http: HttpClient
  ) { }

  getUsuariosAtivos() {
    return this.http.get<any>(this.url + 'usuario-ativo');
  }

  getBannerAtivos() {
    return this.http.get<any>(this.url + 'banner-ativo') ;
  }

  getPostsAtivos() {
    return this.http.get<any>(this.url  + 'post-ativo');
  }

  getPostsMaisLidos()
  {
    return this.http.get<any[]>(this.url + 'posts-mais-lidos');
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
