import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents.component';
import { CardModule } from '../card/card.module';



@NgModule({
  declarations: [DocumentsComponent],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [
      DocumentsComponent
  ]
})
export class DocumentsModule { }
