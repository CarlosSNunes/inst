import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeocmsComponent } from './neocms.component';
import { NeocmsRoutingModule } from './neocms-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHandlerService } from '../http-handler/http-handler.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
  declarations: [
    NeocmsComponent,
    DashboardComponent,
  ],
  imports: [
    NeocmsRoutingModule,
    CommonModule,
    FontAwesomeModule,
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
