import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { RouterModule } from '@angular/router';
import { SubstringPipeModule } from 'src/app/pipes/substring/substring-pipe.module';



@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    RouterModule,
    SubstringPipeModule
  ],
  exports: [CardComponent],
})
export class CardModule { }
