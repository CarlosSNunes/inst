import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RhComponent } from './rh.component';
import { RhRoutingModule } from './rh-routing.module';
import { BannerModule, ContactScheduleAVisitModule, DifferentialModule, IconCardsSectionModule, InfoSectionModule, MaterialsModule, ProductModule, SocialPostsModule } from 'src/app/modules';



@NgModule({
    declarations: [RhComponent],
    imports: [
        CommonModule,
        RhRoutingModule,
        BannerModule,
        ProductModule,
        IconCardsSectionModule,
        DifferentialModule,
        InfoSectionModule,
        ContactScheduleAVisitModule,
        MaterialsModule,
        SocialPostsModule
    ]
})
export class RhModule { }
