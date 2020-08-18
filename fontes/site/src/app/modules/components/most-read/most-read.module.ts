import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostReadComponent } from './most-read.component';



@NgModule({
  declarations: [
    MostReadComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MostReadComponent
  ]
})
export class MostReadModule { }
