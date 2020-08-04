import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../shared/shared.module';
import { MatSliderModule } from '@angular/material';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSliderModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
