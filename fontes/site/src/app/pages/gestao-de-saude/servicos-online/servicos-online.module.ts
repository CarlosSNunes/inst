import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicosOnlineComponent } from './servicos-online.component';
import { ServicosOnlineRoutingModule } from './servicos-online-routing.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';
import { InfoSectionModule } from 'src/app/modules/components/info-section/info-section.module';
import { IconCardsSectionModule } from 'src/app/modules/components/icon-cards-section/icon-cards-section.module';
import { SliderModule } from 'src/app/modules/components/slider/slider.module';



@NgModule({
  declarations: [ServicosOnlineComponent],
  imports: [
    CommonModule,
    ServicosOnlineRoutingModule,
    SimpleBannerModule,
    InfoSectionModule,
    IconCardsSectionModule,
    
    SliderModule
  ]
})
export class ServicosOnlineModule { }
