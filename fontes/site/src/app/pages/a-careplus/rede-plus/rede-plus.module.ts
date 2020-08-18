import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedePlusComponent } from './rede-plus.component';
import { RedePlusRountingModule } from './rede-plus-routing.module';
import { ACareplusVideoModule } from 'src/app/modules/components/a-careplus-video/a-careplus-video.module';
import { InfoSectionModule } from 'src/app/modules/components/info-section/info-section.module';
import { AccreditedNetworkModule } from 'src/app/modules/components/accredited-network/accredited-network.module';
import { LearnMoreModule } from 'src/app/modules/components/learn-more/learn-more.module';
import { CareplusPlusModule } from 'src/app/modules/components/careplus-plus/careplus-plus.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';


@NgModule({
    declarations: [RedePlusComponent],
    imports: [
        CommonModule,
        RedePlusRountingModule,
        ACareplusVideoModule,
        InfoSectionModule,
        AccreditedNetworkModule,
        LearnMoreModule,
        CareplusPlusModule,
        SimpleBannerModule
    ]
})
export class RedePlusModule { }
