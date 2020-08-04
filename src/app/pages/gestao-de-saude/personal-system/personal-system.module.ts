import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalSystemComponent } from './personal-system.component';
import { PersonalSystemRoutingModule } from './personal-system-routing.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';
import { InfoSectionModule } from 'src/app/modules/components/info-section/info-section.module';
import { IconCardsSectionModule } from 'src/app/modules/components/icon-cards-section/icon-cards-section.module';
import { CareplusPlusModule } from 'src/app/modules/components/careplus-plus/careplus-plus.module';



@NgModule({
  declarations: [PersonalSystemComponent],
  imports: [
    CommonModule,
    PersonalSystemRoutingModule,
    SimpleBannerModule,
    InfoSectionModule,
    IconCardsSectionModule,
    CareplusPlusModule
  ]
})
export class PersonalSystemModule { }
