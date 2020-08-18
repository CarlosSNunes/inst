import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { CardModule } from '../card/card.module';



@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [ContactComponent]
  
})
export class ContactModule { }
