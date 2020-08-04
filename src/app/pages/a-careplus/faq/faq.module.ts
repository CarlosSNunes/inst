import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { FaqRoutingModule } from './faq-routing.module';
import { LearnMoreModule } from 'src/app/modules/components/learn-more/learn-more.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AccordionModule } from 'src/app/modules/components/accordion/accordion.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';


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
