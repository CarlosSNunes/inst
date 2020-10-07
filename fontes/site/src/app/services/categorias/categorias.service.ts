import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriasService {
    private apiUrl: string = `${environment.API_URL}/Categorias`;

    constructor(
        private httpClient: HttpClient
    ) { }

    getAll(): Promise<CategoryModel[]> {
        return this.httpClient.get<CategoryModel[]>(this.apiUrl).toPromise();
    }
}
