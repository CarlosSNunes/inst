import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSectionComponent } from './info-section.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
    declarations: [InfoSectionComponent],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        InfoSectionComponent
    ]
})
export class InfoSectionModule { }
