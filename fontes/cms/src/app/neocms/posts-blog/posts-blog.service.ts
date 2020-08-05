import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClassHelper } from 'src/utils/class-helper';
import { Observable } from 'rxjs';
import { PostsBlogModel } from 'src/models/posts-blog/posts-blog.model';
import { PostsBlogCreateModel } from 'src/models/posts-blog/posts-blog-create.model';
import { PostBlogUpdateModel } from 'src/models/posts-blog/posts-blog-update-model';

@Injectable({
  providedIn: 'root'
})
export class PostsBlogService {
  private url = 'https://localhost:4007/Post';
  private classHelper = ClassHelper;

constructor(
  private http: HttpClient
) { }

uploadImage(file: File) {
  return this.http.post(this.url + '/Upload', this.classHelper.jsonToFormData(file));
}

deleteImage(fileName: string) {
  return this.http.post(this.url + '/DeleteImage', fileName);
}

getAll() {
  return this.http.get<PostsBlogModel[]>(this.url);
}

getById(id: string): Observable<PostsBlogModel> {
  return this.http.get<PostsBlogModel>(this.url + '/' + id);
}

post(post: PostsBlogCreateModel) {
  return this.http.post(this.url, this.classHelper.jsonToFormData(post));
}

put(post: PostBlogUpdateModel) {
  return this.http.put(this.url, this.classHelper.jsonToFormData(post));
}

delete(id: number) {
  return this.http.delete(this.url + '/' + id);
}

}
