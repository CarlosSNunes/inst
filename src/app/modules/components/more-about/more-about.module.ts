import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreAboutComponent } from './more-about.component';
import { CardModule } from '../card/card.module';



@NgModule({
  declarations: [MoreAboutComponent],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [MoreAboutComponent]
  
})
export class MoreAboutModule { }
