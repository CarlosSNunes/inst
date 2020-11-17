import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedePlusComponent } from './rede-plus.component';
import { RedePlusRountingModule } from './rede-plus-routing.module';
import { ACareplusVideoModule, InfoSectionModule, AccreditedNetworkModule, LearnMoreModule, SimpleBannerModule, CareplusPlusModule } from 'src/app/modules';


@NgModule({
    declarations: [RedePlusComponent],
    imports: [
        CommonModule,
        RedePlusRountingModule,
        ACareplusVideoModule,
        InfoSectionModule,
        AccreditedNetworkModule,
        LearnMoreModule,
        SimpleBannerModule,
        CareplusPlusModule
    ]
})
export class RedePlusModule { }
