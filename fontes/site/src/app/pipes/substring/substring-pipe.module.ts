import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubstringPipe } from './substring.pipe';


@NgModule({
    declarations: [
        SubstringPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SubstringPipe
    ]
})
export class SubstringPipeModule { }
