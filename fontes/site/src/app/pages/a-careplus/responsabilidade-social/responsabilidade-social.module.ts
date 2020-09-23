import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsabilidadeSocialComponent } from './responsabilidade-social.component';
import { ResponsabilidadeSocialRoutingModule } from './responsabilidade-social-routing.module';
import { BreadcrumbModule } from 'src/app/modules/components/breadcrumb/breadcrumb.module';
import { ACareplusVideoModule } from 'src/app/modules/components/a-careplus-video/a-careplus-video.module';
import { InfoSectionModule } from 'src/app/modules/components/info-section/info-section.module';
import { LearnMoreModule } from 'src/app/modules/components/learn-more/learn-more.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';



@NgModule({
  declarations: [ResponsabilidadeSocialComponent],
  imports: [
    CommonModule,
    ResponsabilidadeSocialRoutingModule,
    BreadcrumbModule,
    ACareplusVideoModule,
    InfoSectionModule,
    LearnMoreModule,
    SimpleBannerModule
  ]
})
export class ResponsabilidadeSocialModule { }
