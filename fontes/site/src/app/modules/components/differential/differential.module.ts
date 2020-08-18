import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DifferentialComponent } from './differential.component';



@NgModule({
    declarations: [DifferentialComponent],
    imports: [
        CommonModule
    ],
    exports: [
        DifferentialComponent
    ]
})
export class DifferentialModule { }
