import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostsBlogModel } from 'src/models/posts-blog/posts-blog.model';

@Injectable({
  providedIn: 'root'
})
export class MaisLidosService {

  private url = 'http://52.3.44.106:8081/Post';
  
  
  constructor(
    private http: HttpClient
    ) { }
    
    getAll() {
      return this.http.get<PostsBlogModel[]>(this.url + "/maisLidos");
    }

}
