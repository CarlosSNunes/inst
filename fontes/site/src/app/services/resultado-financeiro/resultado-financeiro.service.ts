import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResultadoFinanceiroModel } from 'src/app/models';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultadoFinanceiroService {
  private url = 'https://localhost:4008/ResultadoFinanceiro';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<ResultadoFinanceiroModel[]>(this.url)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
