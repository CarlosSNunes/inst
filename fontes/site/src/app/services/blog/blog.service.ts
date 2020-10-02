import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NoticiaModel } from 'src/app/models';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private http: HttpClient) { }

    private url = `${environment.API_URL}/artigos`;

    async getRelatedPosts(post: NoticiaModel): Promise<NoticiaModel[]> {
        return this.http.post<NoticiaModel[]>(this.url, post).toPromise();
    }

    async getLastPosts(): Promise<NoticiaModel[]> {
        return this.http.get<NoticiaModel[]>(this.url).toPromise();
    }

    async getPostBySlug(slug: string): Promise<NoticiaModel> {
        return this.http.get<NoticiaModel>(`${this.url}/${slug}`).toPromise();
    }

    async getMostRead(): Promise<NoticiaModel[]> {
        return this.http.get<NoticiaModel[]>(`${this.url}/maislidos`).toPromise();
    }

    async getAllPostsPaginated(): Promise<any> {
        return this.http.get<any>(this.url).toPromise();
    }

}
