import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHandlerService } from './../../../../../src/app/http-handler/http-handler.service';
import { CategoriasComponent } from './categorias.component';
import { CategoriasCreateComponent } from './categorias-create/categorias-create.component';
import { CategoriasEditComponent } from './categorias-edit/categorias-edit.component';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasService } from './categorias.service';
import { CategoriasDeleteComponent } from './categorias-delete/categorias-delete.component';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    CategoriasComponent,
    CategoriasCreateComponent,
    CategoriasEditComponent,
    CategoriasDeleteComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgWizardModule,
    PaginationModule,
  ],
  providers: [
    CategoriasService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class CategoriasModule { }
