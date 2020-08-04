import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InstagramService {
    url: string = '';
    constructor(
        private httpClient: HttpClient
    ) { }

    async getPosts(): Promise<any> {
        return this.httpClient.get<any>(this.url).toPromise()
    }
}
