import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostReadComponent } from './most-read.component';
import { RouterModule } from '@angular/router';
import { SubstringPipeModule } from 'src/app/pipes/substring/substring-pipe.module';

@NgModule({
    declarations: [
        MostReadComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SubstringPipeModule
    ],
    exports: [
        MostReadComponent
    ]
})
export class MostReadModule { }
