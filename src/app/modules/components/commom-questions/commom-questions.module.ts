import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommomQuestionsComponent } from './commom-questions.component';
import { AccordionModule } from '../accordion/accordion.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [CommomQuestionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AccordionModule
  ],
  exports: [CommomQuestionsComponent],
})
export class CommomQuestionsModule { }
