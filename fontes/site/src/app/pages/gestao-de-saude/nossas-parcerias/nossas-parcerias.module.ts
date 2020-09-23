import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NossasParceriasComponent } from './nossas-parcerias.component';
import { NossasParceriasRoutingModule } from './nossas-parcerias-routing.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';
import { IconCardsSectionModule } from 'src/app/modules/components/icon-cards-section/icon-cards-section.module';
import { ContactModule } from 'src/app/modules/components/contact/contact.module';
import { CardsSectionComponent } from './components/cards-section/cards-section.component';
import { CardModule } from 'src/app/modules/components/card/card.module';



@NgModule({
  declarations: [NossasParceriasComponent, CardsSectionComponent],
  imports: [
    CommonModule,
    NossasParceriasRoutingModule,
    SimpleBannerModule,
    IconCardsSectionModule,
    ContactModule,
    CardModule
  ]
})
export class NossasParceriasModule { }
