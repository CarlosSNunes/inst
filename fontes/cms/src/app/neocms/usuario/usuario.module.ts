import { UsuarioComponent } from './usuario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './usuario-update/usuario-update.component';
import { UsuarioService } from '../usuario/usuario.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgWizardModule } from 'ng-wizard';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AlertModule } from 'ngx-bootstrap/alert';
import { UsuarioAprovacaoComponent } from './usuario-aprovacao/usuario-aprovacao.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioCreateComponent,
    UsuarioUpdateComponent,
    UsuarioAprovacaoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    FontAwesomeModule,
    NgWizardModule,
    NgSelectModule,
    NgxPaginationModule,
    FormsModule,
    ButtonsModule,
    AlertModule
  ],
  providers: [
    UsuarioService,
  ]
})

export class UsuarioModule { }
