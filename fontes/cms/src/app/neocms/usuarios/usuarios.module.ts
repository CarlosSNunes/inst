import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioService } from './usuario.service';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
   UsuariosComponent,
   UsuarioEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    UsuariosRoutingModule,
    // ButtonsModule.forRoot(),
    // PopoverModule.forRoot(),
    // TooltipModule.forRoot(),
    
  ],
  providers: [
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class UsuariosModule { }
