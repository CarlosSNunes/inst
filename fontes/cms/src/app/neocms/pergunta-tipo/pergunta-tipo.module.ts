import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerguntaTipoComponent } from './pergunta-tipo.component';
import { PerguntaTipoCreateComponent } from './pergunta-tipo-create/pergunta-tipo-create.component';
import { PerguntaTipoEditComponent } from './pergunta-tipo-edit/pergunta-tipo-edit.component';
import { PerguntaTipoDeleteComponent } from './pergunta-tipo-delete/pergunta-tipo-delete.component';
import { PerguntaTipoService } from './pergunta-tipo.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PerguntaTipoRoutingModule } from './pergunta-tipo-routing.module';



@NgModule({
  declarations: [
    PerguntaTipoComponent,
    PerguntaTipoCreateComponent,
    PerguntaTipoEditComponent,
    PerguntaTipoDeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    PerguntaTipoRoutingModule
  ],
  providers: [
    PerguntaTipoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class PerguntaTipoModule { }
