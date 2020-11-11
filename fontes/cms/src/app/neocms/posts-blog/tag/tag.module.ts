import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag.component';
import { TagService } from './tag.service';
import { TagCreateComponent } from './tag-create/tag-create.component';
import { TagEditComponent } from './tag-edit/tag-edit.component';
import { TagDeleteComponent } from './tag-delete/tag-delete.component';
import { TagRoutingModule } from './tag-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    TagComponent,
    TagCreateComponent,
    TagEditComponent,
    TagDeleteComponent
  ],
  imports: [
    CommonModule,
    TagRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ModalModule,
  ],
  providers: [
    TagService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class TagModule { }
