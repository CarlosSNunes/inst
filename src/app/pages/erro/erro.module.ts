import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErroComponent } from './erro.component';
import { ErroRoutingModule } from './erro-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ErroComponent
  ],
  imports: [
    CommonModule,
    ErroRoutingModule,
    FontAwesomeModule
  ]
})
export class ErroModule { }
