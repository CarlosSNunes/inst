import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareplusDiferencialComponent } from './careplus-diferencial.component';
import { CareplusDiferencialCreateComponent } from './careplus-diferencial-create/careplus-diferencial-create.component';
import { CareplusDiferencialDeleteComponent } from './careplus-diferencial-delete/careplus-diferencial-delete.component';
import { CareplusDiferencialEditComponent } from './careplus-diferencial-edit/careplus-diferencial-edit.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CareplusDiferencialRoutingModule } from './careplus-diferencial-routing.module';
import { CareplusDiferencialService } from './careplus-diferencial.service';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';



@NgModule({
  declarations: [
    CareplusDiferencialComponent,
    CareplusDiferencialCreateComponent,
    CareplusDiferencialDeleteComponent,
    CareplusDiferencialEditComponent
  ],
  imports: [
    CommonModule,
    CareplusDiferencialRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    CareplusDiferencialService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class CareplusDiferencialModule { }
