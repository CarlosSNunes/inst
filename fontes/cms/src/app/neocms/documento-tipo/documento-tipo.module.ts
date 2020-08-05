import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentoTipoComponent } from './documento-tipo.component';
import { DocumentoTipoCreateComponent } from './documento-tipo-create/documento-tipo-create.component';
import { DocumentoTipoEditComponent } from './documento-tipo-edit/documento-tipo-edit.component';
import { DocumentoTipoDeleteComponent } from './documento-tipo-delete/documento-tipo-delete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DocumentoTipoRoutingModule } from './documento-tipo-routing.module';
import { DocumentoTipoService } from './documento-tipo.service';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';



@NgModule({
  declarations: [
    DocumentoTipoComponent,
    DocumentoTipoCreateComponent,
    DocumentoTipoEditComponent,
    DocumentoTipoDeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    DocumentoTipoRoutingModule
  ],
  providers: [
    DocumentoTipoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class DocumentoTipoModule { }
