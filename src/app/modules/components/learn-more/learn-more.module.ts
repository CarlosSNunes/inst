import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnMoreComponent } from './learn-more.component';
import { SharedModule } from '../../shared/shared.module';
import { CardModule } from '../card/card.module';



@NgModule({
    declarations: [LearnMoreComponent],
    imports: [
        CommonModule,
        SharedModule,
        CardModule
    ],
    exports: [LearnMoreComponent]
})
export class LearnMoreModule { }
