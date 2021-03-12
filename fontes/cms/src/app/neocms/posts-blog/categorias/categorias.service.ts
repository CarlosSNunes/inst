import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriasUpdateModel } from './../../../../../src/models/categorias/categorias-update.model';
import { CategoriasCreateModel } from './../../../../../src/models/categorias/categorias-create.model';
import { CategoriasListModel, CategoriasModel } from './../../../../../src/models/categorias/categorias.model';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriasService {
    private readonly API_ENDPOINT = environment.API + '/Categorias';

    constructor(
        private http: HttpClient
    ) { }

    getAll(page: number, pageSize: number) {
        return this.http.get<CategoriasListModel>(this.API_ENDPOINT + '/' + page + '/' + pageSize);
    }

    getById(id: string) {
        return this.http.get<CategoriasModel>(this.API_ENDPOINT + '/' + id);
    }

    post(banner: CategoriasCreateModel) {
        return this.http.post(this.API_ENDPOINT, banner);
    }

    put(banner: CategoriasUpdateModel) {
        return this.http.put(this.API_ENDPOINT, banner);
    }

    delete(id: number) {
        return this.http.delete(this.API_ENDPOINT + '/' + id);
    }

}
