import { Injectable } from '@angular/core';
import { ClassHelper } from 'src/utils/class-helper';
import { HttpClient } from '@angular/common/http';
import { NewsletterModel } from 'src/models/newsletter/newsletter.model';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private url = 'https://localhost:4005/Newsletter';
  
  constructor(
    private http: HttpClient
  ) { }
    
    getAll() {
      return this.http.get<NewsletterModel[]>(this.url);
    }    
}
  