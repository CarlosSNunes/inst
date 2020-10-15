import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsletterModel } from '../../../../src/models/newsletter/newsletter.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private readonly API_ENDPOINT = environment.API + '/Newsletter';

  constructor(
    private http: HttpClient
  ) { }

    getAll() {
      return this.http.get<NewsletterModel[]>(this.API_ENDPOINT);
    }
}
