import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TagModel } from './../../../../../src/models/tag/tag.model';
import { TagCreateModel } from './../../../../../src/models/tag/tag-create.model';
import { ClassHelper } from './../../../../../src/utils/class-helper';
import { TagUpdateModel } from './../../../../../src/models/tag/tag-update.model';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private readonly API_ENDPOINT = environment.API + '/Tag';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient
  ) { }

  getAll(page: number, pageSize: number) {
    return this.http.get<TagModel[]>(this.API_ENDPOINT + '/' + page + '/' + pageSize);
  }

  getById(id: string) {
    return this.http.get<TagModel>(this.API_ENDPOINT + '/' + id);
  }

  delete(id: number) {
    return this.http.delete(this.API_ENDPOINT + '/' + id);
  }

  post(tags: TagCreateModel[]) {
    return this.http.post(this.API_ENDPOINT, tags);
  }

  put(tags: TagUpdateModel[]) {
    return this.http.put(this.API_ENDPOINT, tags);
  }
}
