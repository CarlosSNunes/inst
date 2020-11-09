import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClassHelper } from './../../../../src/utils/class-helper';
import { Observable } from 'rxjs';
import { PostsBlogModel } from './../../../../src/models/posts-blog/posts-blog.model';
import { PostsBlogCreateModel } from './../../../../src/models/posts-blog/posts-blog-create.model';
import { PostBlogUpdateModel } from './../../../../src/models/posts-blog/posts-blog-update-model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsBlogService {
  private readonly API_ENDPOINT = environment.API + '/Post';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient
  ) { }

  uploadImage(file: File) {
    return this.http.post(this.API_ENDPOINT + '/Upload', this.classHelper.jsonToFormData(file));
  }

  deleteImage(fileName: string) {
    return this.http.post(this.API_ENDPOINT + '/DeleteImage', fileName);
  }

  getAll(page: number, pageSize: number) {
    return this.http.get<PostsBlogModel[]>(this.API_ENDPOINT + '/' + page + '/' + pageSize);
  }

  getById(id: string): Observable<PostsBlogModel> {
    return this.http.get<PostsBlogModel>(this.API_ENDPOINT + '/' + id);
  }

  getByCategoryId(id: string): Observable<PostsBlogModel> {
    return this.http.get<PostsBlogModel>(this.API_ENDPOINT + '/categoria/' + id);
  }

  post(post: PostsBlogCreateModel) {
    return this.http.post(this.API_ENDPOINT, this.classHelper.jsonToFormData(post));
  }

  put(post: PostBlogUpdateModel) {
    return this.http.put(this.API_ENDPOINT, this.classHelper.jsonToFormData(post));
  }

  delete(id: number) {
    return this.http.delete(this.API_ENDPOINT + '/' + id);
  }

}
