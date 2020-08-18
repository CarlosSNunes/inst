import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactScheduleAVisitComponent } from './contact-schedule-a-visit.component';
import { RouterModule } from '@angular/router';
import { CardModule } from '../card/card.module';



@NgModule({
  declarations: [ContactScheduleAVisitComponent],
  imports: [
    CommonModule,
    RouterModule,
    CardModule
  ], exports: [ContactScheduleAVisitComponent]
})
export class ContactScheduleAVisitModule { }
