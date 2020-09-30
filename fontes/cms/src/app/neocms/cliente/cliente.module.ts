import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente.component';
import { ClienteCreateComponent } from './cliente-create/cliente-create.component';
import { ClienteEditComponent } from './cliente-edit/cliente-edit.component';
import { ClienteDeleteComponent } from './cliente-delete/cliente-delete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClienteRoutingModule } from './cliente-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClienteService } from './cliente.service';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';



@NgModule({
  declarations: [
    ClienteComponent,
    ClienteCreateComponent,
    ClienteEditComponent,
    ClienteDeleteComponent]
  ,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClienteRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    ClienteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class ClienteModule { }