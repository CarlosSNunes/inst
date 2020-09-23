import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicinaOcupacionalComponent } from './medicina-ocupacional.component';
import { MedicinaOcupacionalRoutingModule } from './medicina-ocupacional-routing.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';
import { InfoSectionModule } from 'src/app/modules/components/info-section/info-section.module';
import { ContactScheduleAVisitModule } from 'src/app/modules/components/contact-schedule-a-visit/contact-schedule-a-visit.module';
import { IconCardsSectionModule } from 'src/app/modules/components/icon-cards-section/icon-cards-section.module';



@NgModule({
    declarations: [MedicinaOcupacionalComponent],
    imports: [
        CommonModule,
        MedicinaOcupacionalRoutingModule,
        SimpleBannerModule,
        InfoSectionModule,
        ContactScheduleAVisitModule,
        
        IconCardsSectionModule
    ]
})
export class MedicinaOcupacionalModule { }
