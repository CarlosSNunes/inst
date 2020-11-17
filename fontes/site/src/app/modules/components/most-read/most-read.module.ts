import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostReadComponent } from './most-read.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        MostReadComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        MostReadComponent
    ]
})
export class MostReadModule { }
