import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErroComponent } from './erro.component';
import { ErroRoutingModule } from './erro-routing.module';
import { BreadcrumbModule } from 'src/app/modules';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ErroComponent
  ],
  imports: [
    CommonModule,
    ErroRoutingModule,
    BreadcrumbModule,
    RouterModule
  ]
})
export class ErroModule { }
