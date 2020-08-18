import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconCardsSectionComponent } from './icon-cards-section.component';
import { CardModule } from '../card/card.module';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [IconCardsSectionComponent],
    imports: [
        CommonModule,
        CardModule,
        RouterModule
    ],
    exports: [
        IconCardsSectionComponent
    ]
})
export class IconCardsSectionModule { }
