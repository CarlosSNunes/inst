import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostListModel } from './../../../../../src/models/posts-blog/posts-blog.model';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaisLidosService {

  private readonly API_ENDPOINT = environment.API + '/Post';


  constructor(
    private http: HttpClient
    ) { }

    getPaginated(offset: number, limit: number) {
      return this.http.get<PostListModel>(`${this.API_ENDPOINT}/maisLidos/${offset}/${limit}`);
    }

}
