import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { FaqRoutingModule } from './faq-routing.module';
import { LearnMoreModule, SharedModule, AccordionModule, SimpleBannerModule } from 'src/app/modules';

@NgModule({
    declarations: [FaqComponent],
    imports: [
        CommonModule,
        FaqRoutingModule,
        SharedModule,
        LearnMoreModule,
        AccordionModule,
        SimpleBannerModule
    ]
})
export class FaqModule { }
