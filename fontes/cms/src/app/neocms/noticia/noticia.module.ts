import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiaComponent } from './noticia.component';
import { NoticiaService } from './noticia.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoticiaEditComponent } from './noticia-edit/noticia-edit.component';
import { NoticiaCreateComponent } from './noticia-create/noticia-create.component';
import { NoticiaRoutingModule } from './noticia-routing.module';
import { TagModule } from './tag/tag.module';
import { NoticiaIndexComponent } from './noticia-index/noticia-index.component';
import { NoticiaDeleteComponent } from './noticia-delete/noticia-delete.component';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { TipoModule } from './tipo/tipo.module';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';

@NgModule({
  declarations: [
    NoticiaComponent,
    NoticiaEditComponent,
    NoticiaCreateComponent,
    NoticiaIndexComponent,
    NoticiaDeleteComponent,
  ],
  imports: [
    NoticiaRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    FontAwesomeModule,
    TagModule,
    TipoModule
  ],
  providers: [
    NoticiaService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class NoticiaModule { }
