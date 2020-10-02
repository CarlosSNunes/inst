import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DifferentialComponent } from './differential.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [DifferentialComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        DifferentialComponent
    ]
})
export class DifferentialModule { }
