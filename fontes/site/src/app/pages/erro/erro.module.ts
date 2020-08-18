import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErroComponent } from './erro.component';
import { ErroRoutingModule } from './erro-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BreadcrumbModule } from 'src/app/modules/components/breadcrumb/breadcrumb.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ErroComponent
  ],
  imports: [
    CommonModule,
    ErroRoutingModule,
    FontAwesomeModule,
    BreadcrumbModule,
    RouterModule
  ]
})
export class ErroModule { }
