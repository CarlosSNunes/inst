import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Unity } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UnidadesService {
    url: string = `${environment.API_URL}/api/`;
    constructor(
        private httpClient: HttpClient
    ) { }

    async getUnitsByDay(date: string): Promise<Unity[]> {
        return this.httpClient.get<Unity[]>(`${this.url}unidades?date=${date}`).toPromise()
    }
}
