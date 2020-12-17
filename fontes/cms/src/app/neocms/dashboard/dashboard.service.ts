import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { PostBlogModel } from 'src/models/posts-blog/posts-blog.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly API_ENDPOINT = environment.API + '/Dashboard/';

  constructor(
    private http: HttpClient
  ) { }

  getUsuarios() {
    return this.http.get<number>(this.API_ENDPOINT + 'usuarios');
  }

  getBannerAtivos() {
    return this.http.get<number>(this.API_ENDPOINT + 'banners-count');
  }

  getPostsAtivos() {
    return this.http.get<number>(this.API_ENDPOINT + 'posts-count');
  }

  getPostsMaisLidos() {
    return this.http.get<PostBlogModel[]>(this.API_ENDPOINT + 'posts-mais-lidos');
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
