import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { RouterModule } from '@angular/router';
import { SubstringPipe } from './pipes/substring.pipe';



@NgModule({
  declarations: [CardComponent, SubstringPipe],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CardComponent],
})
export class CardModule { }
