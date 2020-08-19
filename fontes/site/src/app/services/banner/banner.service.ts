import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BannerModel } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BannerService {
    private url = `${environment.API_URL}/Banner`;

    constructor(
        private http: HttpClient
    ) { }

    async getAll(area: string): Promise<BannerModel[]> {
        return this.http.get<BannerModel[]>(`${this.url}/${area}`).toPromise();
    }
}
