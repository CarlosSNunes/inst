import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcessibilidadeComponent } from './acessibilidade.component';
import { AcessibilidadeRoutingModule } from './acessibilidade-routing.module';



@NgModule({
  declarations: [AcessibilidadeComponent],
  imports: [
    CommonModule,
    AcessibilidadeRoutingModule
  ]
})
export class AcessibilidadeModule { }