import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import { NgImageSliderModule } from 'ng-image-slider';


@NgModule({
  declarations: [SliderComponent],
  imports: [
    NgImageSliderModule,
    CommonModule,
  ],
  exports: [
      SliderComponent
  ]
})
export class SliderModule { }
