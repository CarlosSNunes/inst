import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentoComponent } from './documento.component';
import { DocumentoCreateComponent } from './documento-create/documento-create.component';
import { DocumentoEditComponent } from './documento-edit/documento-edit.component';
import { DocumentoDeleteComponent } from './documento-delete/documento-delete.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DocumentoService } from './documento.service';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';
import { DocumentoRoutingModule } from './documento-routing.module';
import { DocumentoTipoService } from '../documento-tipo/documento-tipo.service';
import { CareplusPerfilService } from '../careplus-perfil/careplus-perfil.service';



@NgModule({
  declarations: [
    DocumentoComponent,
    DocumentoCreateComponent,
    DocumentoEditComponent,
    DocumentoDeleteComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DocumentoRoutingModule
  ],
  providers: [
    DocumentoService,
    CareplusPerfilService,
    DocumentoTipoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class DocumentoModule { }
