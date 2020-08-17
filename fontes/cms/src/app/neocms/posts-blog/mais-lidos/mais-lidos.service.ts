import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostsBlogModel } from 'src/models/posts-blog/posts-blog.model';

@Injectable({
  providedIn: 'root'
})
export class MaisLidosService {

  private url = 'https://localhost:4000/Post';
  
  
  constructor(
    private http: HttpClient
    ) { }
    
    getAll() {
      return this.http.get<PostsBlogModel[]>(this.url + "/maisLidos");
    }

}
