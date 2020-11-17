import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassHelper } from './../../../../src/utils/class-helper';
import { Observable } from 'rxjs';
import { PostListModel } from './../../../../src/models/posts-blog/posts-blog.model';
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

  getAll(page: number, pageSize: number): Observable<PostListModel> {
    return this.http.get<PostListModel>(this.API_ENDPOINT + '/' + page + '/' + pageSize);
  }

  getBySlug(slug: string): Observable<PostBlogUpdateModel> {
    return this.http.get<PostBlogUpdateModel>(this.API_ENDPOINT + '/' + slug);
  }

  getByCategoryId(id: string): Observable<PostListModel> {
    return this.http.get<PostListModel>(this.API_ENDPOINT + '/categoria/' + id);
  }

  post(post: PostsBlogCreateModel) {
    return this.http.post(this.API_ENDPOINT, this.classHelper.jsonToFormData(post));
  }

  put(post: PostBlogUpdateModel) {
    return this.http.put(this.API_ENDPOINT, this.classHelper.jsonToFormData(post));
  }

  delete(id: string) {
    return this.http.delete(this.API_ENDPOINT + '/' + id);
  }

}
