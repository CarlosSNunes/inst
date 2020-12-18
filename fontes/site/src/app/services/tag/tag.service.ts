import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TagModel } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  url = 'https://localhost:4006/NoticiaTipo';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<TagModel[]>(this.url);
  }
}
