import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareplusPerfilComponent } from './careplus-perfil.component';
import { CareplusPerfilCreateComponent } from './careplus-perfil-create/careplus-perfil-create.component';
import { CareplusPerfilEditComponent } from './careplus-perfil-edit/careplus-perfil-edit.component';
import { CareplusPerfilDeleteComponent } from './careplus-perfil-delete/careplus-perfil-delete.component';
import { CareplusPerfilRoutingModule } from './careplus-perfil-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CareplusPerfilService } from './careplus-perfil.service';
import { HttpHandlerService } from '../../../../src/app/http-handler/http-handler.service';



@NgModule({
  declarations: [
    CareplusPerfilComponent,
    CareplusPerfilCreateComponent,
    CareplusPerfilEditComponent,
    CareplusPerfilDeleteComponent
  ],
  imports: [
    CommonModule,
    CareplusPerfilRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [
    CareplusPerfilService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class CareplusPerfilModule { }
