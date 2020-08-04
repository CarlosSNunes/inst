import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrossContentSectionComponent } from './cross-content-section.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CrossContentSectionComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CrossContentSectionComponent]
})
export class CrossContentSectionModule { }
