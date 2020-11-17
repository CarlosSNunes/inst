import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareplusPlusComponent } from './careplus-plus.component';
import { RouterModule } from '@angular/router';
import { CardModule } from '../card/card.module';



@NgModule({
    declarations: [CareplusPlusComponent],
    imports: [
        CommonModule,
        RouterModule,
        CardModule
    ],
    exports: [
        CareplusPlusComponent
    ]
})
export class CareplusPlusModule { }
