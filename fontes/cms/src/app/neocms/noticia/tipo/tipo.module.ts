import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoComponent } from './tipo.component';
import { TipoCreateComponent } from './tipo-create/tipo-create.component';
import { TipoEditComponent } from './tipo-edit/tipo-edit.component';
import { TipoDeleteComponent } from './tipo-delete/tipo-delete.component';
import { TipoRoutingModule } from './tipo-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TipoService } from './tipo.service';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';



@NgModule({
  declarations: [
    TipoComponent,
    TipoCreateComponent,
    TipoEditComponent,
    TipoDeleteComponent
  ],
  imports: [
    CommonModule,
    TipoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    TipoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class TipoModule { }
