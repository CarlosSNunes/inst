import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TagModel } from './../../../../../src/models/tag/tag.model';
import { TagCreateModel } from './../../../../../src/models/tag/tag-create.model';
import { ClassHelper } from './../../../../../src/utils/class-helper';
import { TagUpdateModel } from './../../../../../src/models/tag/tag-update.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  url = 'localhost:8081/Tag';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<TagModel[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<TagModel>(this.url + '/' + id);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  post(tags: TagCreateModel[]) {
    return this.http.post(this.url, tags);
  }

  put(tags: TagUpdateModel[]) {
    return this.http.put(this.url, tags);
  }
}
