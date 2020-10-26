import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicinaOcupacionalComponent } from './medicina-ocupacional.component';
import { MedicinaOcupacionalRoutingModule } from './medicina-ocupacional-routing.module';
import { ContactScheduleAVisitModule, IconCardsSectionModule, InfoSectionModule, SimpleBannerModule } from 'src/app/modules';



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
