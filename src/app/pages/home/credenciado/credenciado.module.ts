import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredenciadoComponent } from './credenciado.component';
import { CredenciadoRoutingModule } from './credenciado-routing.module';
import { BannerModule } from 'src/app/modules/components/banner/banner.module';
import { ACareplusVideoModule } from 'src/app/modules/components/a-careplus-video/a-careplus-video.module';
import { DifferentialModule } from 'src/app/modules/components/differential/differential.module';
import { ContactScheduleAVisitModule } from 'src/app/modules/components/contact-schedule-a-visit/contact-schedule-a-visit.module';
import { MaterialsModule } from 'src/app/modules/components/materials/materials.module';
import { CareplusPlusModule } from 'src/app/modules/components/careplus-plus/careplus-plus.module';
import { SocialPostsModule } from 'src/app/modules/components/social-posts/social-posts.module';
import { IconCardsSectionModule } from 'src/app/modules/components/icon-cards-section/icon-cards-section.module';



@NgModule({
  declarations: [CredenciadoComponent],
  imports: [
    CommonModule,
    CredenciadoRoutingModule,
    BannerModule,
    ACareplusVideoModule,
    DifferentialModule,
    IconCardsSectionModule,
    ContactScheduleAVisitModule,
    MaterialsModule,
    CareplusPlusModule,
    SocialPostsModule
  ]
})
export class CredenciadoModule { }
