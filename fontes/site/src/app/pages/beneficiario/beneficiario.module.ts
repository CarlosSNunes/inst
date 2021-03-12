import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiarioComponent } from './beneficiario.component';
import { BeneficiarioRoutingModule } from './beneficiario-routing.module';
import { BannerModule, AccreditedNetworkModule, PlusNetworkModule, DifferentialModule, SocialPostsModule, AppCareplusModule, MaterialsModule, InfoSectionModule, IconCardsSectionModule, CareplusPlusModule } from 'src/app/modules';

@NgModule({
    declarations: [BeneficiarioComponent],
    imports: [
        CommonModule,
        BeneficiarioRoutingModule,
        BannerModule,
        AccreditedNetworkModule,
        IconCardsSectionModule,
        PlusNetworkModule,
        DifferentialModule,
        InfoSectionModule,
        SocialPostsModule,
        AppCareplusModule,
        MaterialsModule,
        CareplusPlusModule
    ]
})
export class BeneficiarioModule { }
