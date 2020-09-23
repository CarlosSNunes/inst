import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioService } from './usuario.service';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioDeleteComponent } from './usuario-delete/usuario-delete.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';



@NgModule({
  declarations: [
   UsuariosComponent,
   UsuarioCreateComponent,
   UsuarioDeleteComponent,
   UsuarioEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    UsuariosRoutingModule
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
