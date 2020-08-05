import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareplusDepoimentoComponent } from './careplus-depoimento.component';
import { CareplusDepoimentoCreateComponent } from './careplus-depoimento-create/careplus-depoimento-create.component';
import { CareplusDepoimentoEditComponent } from './careplus-depoimento-edit/careplus-depoimento-edit.component';
import { CareplusDepoimentoDeleteComponent } from './careplus-depoimento-delete/careplus-depoimento-delete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CareplusDepoimentoRoutingModule } from './careplus-depoimento-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CareplusDepoimentoService } from './careplus-depoimento.service';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';



@NgModule({
  declarations: [
    CareplusDepoimentoComponent,
    CareplusDepoimentoCreateComponent,
    CareplusDepoimentoEditComponent,
    CareplusDepoimentoDeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CareplusDepoimentoRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    CareplusDepoimentoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class CareplusDepoimentoModule { }
