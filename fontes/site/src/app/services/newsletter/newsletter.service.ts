import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NewsletterService {
    private url = `${environment.API_URL}/Newsletter`;

    constructor(
        private httpClient: HttpClient
    ) { }

    create(newsletter: NewsLetterModel): Promise<{ success: boolean }> {
        return this.httpClient.post<{ success: boolean }>(this.url, newsletter).toPromise();
    }
}
