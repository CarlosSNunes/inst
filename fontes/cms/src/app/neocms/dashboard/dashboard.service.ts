import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostsBlogModel } from 'src/models/posts-blog/posts-blog.model';
import { ClassHelper } from 'src/utils/class-helper';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = 'https://localhost:4022/Dashboard/';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient
  ) { }

  getUsuariosAtivos() {
    return this.http.get<any[]>(this.url) + 'usuario-ativo';
  }

  getBannerAtivos() {
    return this.http.get<any[]>(this.url) + 'banner-ativo';
  }

  getPostsAtivos() {
    return this.http.get<any[]>(this.url) + 'post-ativo';
  }

  getPostsMaisLidos()
  {
    return this.http.get<any[]>(this.url + 'posts-mais-lidos');
  }
}
