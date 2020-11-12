import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostsBlogRoutingModule } from './posts-blog-routing.module';
import { CategoriasModule } from './categorias/categorias.module';
import { MaisLidosModule } from './mais-lidos/mais-lidos.module';
import { TagModule } from './tag/tag.module';
import { HttpHandlerService } from './../../../../src/app/http-handler/http-handler.service';
import { PostsBlogService } from './posts-blog.service';
import { AuthenticationService } from './../../../../src/app/authentication/authentication.service';
import { PostsBlogComponent } from './posts-blog.component';
import { PostsBlogCreateComponent } from './posts-blog-create/posts-blog-create.component';
import { PostsBlogEditComponent } from './posts-blog-edit/posts-blog-edit.component';
import { PostsBlogDeleteComponent } from './posts-blog-delete/posts-blog-delete.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';

defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    PostsBlogComponent,
    PostsBlogCreateComponent,
    PostsBlogEditComponent,
    PostsBlogDeleteComponent,
  ],
  entryComponents: [
    PostsBlogDeleteComponent
  ],
  imports: [
    PostsBlogRoutingModule,
    CommonModule,
    CKEditorModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    CategoriasModule,
    MaisLidosModule,
    TagModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    PostsBlogService,
    AuthenticationService,
    BsModalRef,
    DatePipe,
    {
      useValue: 'pt',
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    },

  ]
})
export class PostsBlogModule { }
