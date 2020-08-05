import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerguntaComponent } from './pergunta.component';
import { PerguntaCreateComponent } from './pergunta-create/pergunta-create.component';
import { PerguntaDeleteComponent } from './pergunta-delete/pergunta-delete.component';
import { PerguntaEditComponent } from './pergunta-edit/pergunta-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PerguntaRoutingModule } from './pergunta-routing.module';
import { PerguntaService } from './pergunta.service';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';
import { PerguntaTipoService } from '../pergunta-tipo/pergunta-tipo.service';



@NgModule({
  declarations: [
    PerguntaComponent,
    PerguntaCreateComponent,
    PerguntaDeleteComponent,
    PerguntaEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    PerguntaRoutingModule
  ],
  providers: [
    PerguntaService,
    PerguntaTipoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class PerguntaModule { }
