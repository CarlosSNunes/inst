import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanCardComponent } from './plan-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [PlanCardComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [PlanCardComponent]
})
export class PlanCardModule { }
