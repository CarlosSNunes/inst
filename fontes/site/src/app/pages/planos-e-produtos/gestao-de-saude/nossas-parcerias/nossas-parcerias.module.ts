import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NossasParceriasComponent } from './nossas-parcerias.component';
import { NossasParceriasRoutingModule } from './nossas-parcerias-routing.module';
import { SimpleBannerModule, IconCardsSectionModule, ContactModule, CardModule } from 'src/app/modules';
import { CardsSectionComponent } from './components/cards-section/cards-section.component';

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
