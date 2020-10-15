import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostsBlogModel } from './../../../../../src/models/posts-blog/posts-blog.model';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaisLidosService {

  private readonly API_ENDPOINT = environment.API + '/Post';


  constructor(
    private http: HttpClient
    ) { }

    getAll() {
      return this.http.get<PostsBlogModel[]>(this.API_ENDPOINT + '/maisLidos');
    }

}
