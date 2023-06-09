import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicosOnlineComponent } from './servicos-online.component';
import { ServicosOnlineRoutingModule } from './servicos-online-routing.module';
import { CareplusPlusModule, IconCardsSectionModule, InfoSectionModule, SimpleBannerModule, SliderModule } from 'src/app/modules';
@NgModule({
    declarations: [ServicosOnlineComponent],
    imports: [
        CommonModule,
        ServicosOnlineRoutingModule,
        SimpleBannerModule,
        InfoSectionModule,
        IconCardsSectionModule,
        SliderModule,
        CareplusPlusModule
    ]
})
export class ServicosOnlineModule { }
