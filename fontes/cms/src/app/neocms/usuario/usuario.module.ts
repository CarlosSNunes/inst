import { UsuarioComponent } from './usuario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './usuario-update/usuario-update.component';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHandlerService } from './../../../../src/app/http-handler/http-handler.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { NgWizardModule} from 'ng-wizard';


@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioCreateComponent, 
    UsuarioUpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    UsuarioRoutingModule,
    FontAwesomeModule,
    SelectDropDownModule,
    NgWizardModule,
    
    
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

export class UsuarioModule { }