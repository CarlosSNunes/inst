import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
    ListaTipoAssuntoFaleConosco,
    GravarFaleConoscoEntrada,
    GravarFaleConoscoSaida,
    GravarCanalDenunciaEntrada,
    GravarCanalDenunciaSaida,
    CaptchaSaida,
    BuscarAssuntoOuvidoriaSaida,
    BuscarClassificacaoOuvidoriaSaida,
    GravarOuvidoriaEntrada,
    GravarOuvidoriaSaida
} from 'src/app/models';

@Injectable({
    providedIn: 'root'
})
export class FaleConoscoService {
    constructor(private http: HttpClient) { }

    private url = `${environment.API_URL}/fale-conosco/`;

    getCaptcha(): Promise<CaptchaSaida> {
        return this.http.get<CaptchaSaida>(`${this.url}captcha`).toPromise();
    }

    getListaTipoAssuntoFaleConosco(): Promise<ListaTipoAssuntoFaleConosco> {
        return this.http.get<ListaTipoAssuntoFaleConosco>(`${this.url}tipo-assunto-fale-conosco`).toPromise();
    }

    gravarFaleConosco(body: GravarFaleConoscoEntrada): Promise<GravarFaleConoscoSaida> {
        return this.http.post<GravarFaleConoscoSaida>(`${this.url}gravar-fale-conosco`, body).toPromise();
    }

    gravarCanalDeDenuncia(body: GravarCanalDenunciaEntrada): Promise<GravarCanalDenunciaSaida> {
        return this.http.post<GravarCanalDenunciaSaida>(`${this.url}gravar-canal-de-denuncia`, body).toPromise();
    }

    buscarAssuntoOuvidoria(): Promise<BuscarAssuntoOuvidoriaSaida> {
        return this.http.get<BuscarAssuntoOuvidoriaSaida>(`${this.url}assunto-ouvidoria`).toPromise();
    }

    buscarClassificacaoOuvidoria(): Promise<BuscarClassificacaoOuvidoriaSaida> {
        return this.http.get<BuscarClassificacaoOuvidoriaSaida>(`${this.url}classificacao-ouvidoria`).toPromise();
    }

    gravarOuvidoria(body: GravarOuvidoriaEntrada): Promise<GravarOuvidoriaSaida> {
        return this.http.post<GravarOuvidoriaSaida>(`${this.url}gravar-ouvidoria`, body).toPromise();
    }

}
