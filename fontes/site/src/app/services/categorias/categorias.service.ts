import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel, PaginatedCategoryModel } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriasService {
    private apiUrl: string = `${environment.API_URL}/Categorias`;

    constructor(
        private httpClient: HttpClient
    ) { }

    getAllPaginated(skip: number, take: number): Promise<PaginatedCategoryModel> {
        return this.httpClient.get<PaginatedCategoryModel>(`${this.apiUrl}/${skip}/${take}`).toPromise();
    }

    getById(id: number): Promise<CategoryModel> {
        return this.httpClient.get<CategoryModel>(`${this.apiUrl}/${id}`).toPromise();
    }
}
