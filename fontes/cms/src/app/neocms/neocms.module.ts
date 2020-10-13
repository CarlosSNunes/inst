/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeocmsComponent } from './neocms.component';
import { NeocmsRoutingModule } from './neocms-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHandlerService } from '../http-handler/http-handler.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PostsBlogModule } from './posts-blog/posts-blog.module';
import { PostsBlogComponent } from './posts-blog/posts-blog.component';
import { PostsBlogDeleteComponent } from './posts-blog/posts-blog-delete/posts-blog-delete.component';
import { BsModalRef } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    NeocmsComponent,
    DashboardComponent,
  ],
  imports: [
    NeocmsRoutingModule,
    CommonModule,
    FontAwesomeModule,
    PostsBlogModule
   
  ],
  providers: [
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    },
  ]
})
export class NeocmsModule { }
