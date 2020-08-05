import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoFinanceiroComponent } from './resultado-financeiro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResultadoFinanceiroRoutingModule } from './resultado-financeiro-routing.module';
import { ResultadoFinanceiroService } from './resultado-financeiro.service';
import { ResultadoFinanceiroCreateComponent } from './resultado-financeiro-create/resultado-financeiro-create.component';
import { ResultadoFinanceiroEditComponent } from './resultado-financeiro-edit/resultado-financeiro-edit.component';
import { ResultadoFinanceiroDeleteComponent } from './resultado-financeiro-delete/resultado-financeiro-delete.component';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';



@NgModule({
  declarations: [
    ResultadoFinanceiroComponent,
    ResultadoFinanceiroCreateComponent,
    ResultadoFinanceiroEditComponent,
    ResultadoFinanceiroDeleteComponent
  ],
  imports: [
    CommonModule,
    ResultadoFinanceiroRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    ResultadoFinanceiroService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class ResultadoFinanceiroModule { }
