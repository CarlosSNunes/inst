import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [AccordionComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
      AccordionComponent
  ]
})
export class AccordionModule { }
