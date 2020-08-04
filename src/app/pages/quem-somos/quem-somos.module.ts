import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuemSomosComponent } from './quem-somos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuemSomosRoutingModule } from './quem-somos-routing.module';


@NgModule({
  declarations: [QuemSomosComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    QuemSomosRoutingModule
  ]
})
export class QuemSomosModule { }
