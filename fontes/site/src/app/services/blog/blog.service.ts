import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NoticiaModel, NoticiasPaginadas } from 'src/app/models';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private http: HttpClient) { }

    private url = `${environment.API_URL}/Post`;

    async getRelatedPosts(post: NoticiaModel, skip: number, take: number): Promise<NoticiasPaginadas> {
        return this.http.get<NoticiasPaginadas>(`${this.url}/categoria/${post.categoriaId}/${skip}/${take}/${post.slug}`).toPromise();
    }

    async getPaginatedByTerm(skip: number, take: number, term: string): Promise<NoticiasPaginadas> {
        return this.http.get<NoticiasPaginadas>(`${this.url}/term/${term}/${skip}/${take}`).toPromise();
    }

    async getPostBySlug(slug: string): Promise<NoticiaModel> {
        return this.http.get<NoticiaModel>(`${this.url}/hit/${slug}`).toPromise();
    }

    async getMostRead(skip: number, take: number): Promise<NoticiasPaginadas> {
        return this.http.get<NoticiasPaginadas>(`${this.url}/maisLidos/${skip}/${take}`).toPromise();
    }

    async getByCategoryId(id: number, skip: number, take: number): Promise<NoticiasPaginadas> {
        return this.http.get<NoticiasPaginadas>(`${this.url}/categoria-id/${id}/${skip}/${take}`).toPromise();
    }

    async getAllPostsPaginated(skip: number, take: number): Promise<NoticiasPaginadas> {
        return this.http.get<NoticiasPaginadas>(`${this.url}/${skip}/${take}`).toPromise();
    }

}
