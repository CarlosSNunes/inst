import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RhComponent } from './rh.component';
import { RhRoutingModule } from './rh-routing.module';
import { BannerModule } from 'src/app/modules/components/banner/banner.module';
import { ProductModule } from 'src/app/modules/components/product/product.module';
import { DifferentialModule } from 'src/app/modules/components/differential/differential.module';
import { MaterialsModule } from 'src/app/modules/components/materials/materials.module';
import { SocialPostsModule } from 'src/app/modules/components/social-posts/social-posts.module';
import { ContactScheduleAVisitModule } from 'src/app/modules/components/contact-schedule-a-visit/contact-schedule-a-visit.module';
import { CareplusPlusModule } from 'src/app/modules/components/careplus-plus/careplus-plus.module';
import { InfoSectionModule } from 'src/app/modules/components/info-section/info-section.module';
import { IconCardsSectionModule } from 'src/app/modules/components/icon-cards-section/icon-cards-section.module';



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
        CareplusPlusModule,
        SocialPostsModule
    ]
})
export class RhModule { }
