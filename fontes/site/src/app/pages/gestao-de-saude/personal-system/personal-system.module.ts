import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalSystemComponent } from './personal-system.component';
import { PersonalSystemRoutingModule } from './personal-system-routing.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';
import { InfoSectionModule } from 'src/app/modules/components/info-section/info-section.module';
import { IconCardsSectionModule } from 'src/app/modules/components/icon-cards-section/icon-cards-section.module';



@NgModule({
  declarations: [PersonalSystemComponent],
  imports: [
    CommonModule,
    PersonalSystemRoutingModule,
    SimpleBannerModule,
    InfoSectionModule,
    IconCardsSectionModule,
  ]
})
export class PersonalSystemModule { }
