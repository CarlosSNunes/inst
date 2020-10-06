import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostsBlogRoutingModule } from './posts-blog-routing.module';
import { CategoriasModule } from './categorias/categorias.module';
import { MaisLidosModule } from './mais-lidos/mais-lidos.module';
import { TagModule } from './tag/tag.module';


import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';
import { PostsBlogService } from './posts-blog.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

import { PostsBlogComponent } from './posts-blog.component';
import { PostsBlogCreateComponent } from './posts-blog-create/posts-blog-create.component';
import { PostsBlogEditComponent } from './posts-blog-edit/posts-blog-edit.component';
import { PostsBlogDeleteComponent } from './posts-blog-delete/posts-blog-delete.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownConfig, BsDropdownDirective, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [
    PostsBlogComponent,
    PostsBlogCreateComponent,
    PostsBlogEditComponent,
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
    BsDropdownModule.forRoot()
  ],
  providers: [
    PostsBlogService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class PostsBlogModule { }
