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

    async getRelatedPosts(post: NoticiaModel, page: number, pageSize: number): Promise<NoticiasPaginadas> {
        return this.http.get<NoticiasPaginadas>(`${this.url}/categoria/${post.categoriaId}/${page}/${pageSize}/${post.slug}`).toPromise();
    }

    async getLastPosts(): Promise<NoticiasPaginadas> {
        return this.http.get<NoticiasPaginadas>(`${this.url}/1/7`).toPromise();
    }

    async getPaginatedByTerm(page: number, pageSize: number, term: string): Promise<NoticiasPaginadas> {
        return this.http.get<NoticiasPaginadas>(`${this.url}/term/${term}/${page}/${pageSize}`).toPromise();
    }

    async getPostBySlug(slug: string): Promise<NoticiaModel> {
        return this.http.get<NoticiaModel>(`${this.url}/hit/${slug}`).toPromise();
    }

    async getMostRead(page: number, pageSize: number): Promise<NoticiasPaginadas> {
        return this.http.get<NoticiasPaginadas>(`${this.url}/maisLidos/${page}/${pageSize}`).toPromise();
    }

    async getByCategoryId(id: number, page: number, pageSize: number): Promise<NoticiasPaginadas> {
        return this.http.get<NoticiasPaginadas>(`${this.url}/categoria/${id}/${page}/${pageSize}`).toPromise();
    }

    async getAllPostsPaginated(page: number, pageSize: number): Promise<NoticiasPaginadas> {
        return this.http.get<NoticiasPaginadas>(`${this.url}/${page}/${pageSize}`).toPromise();
    }

}
