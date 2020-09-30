import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiarioComponent } from './beneficiario.component';
import { BeneficiarioRoutingModule } from './beneficiario-routing.module';
import { BannerModule } from 'src/app/modules/components/banner/banner.module';
import { AccreditedNetworkModule } from 'src/app/modules/components/accredited-network/accredited-network.module';
import { PlusNetworkModule } from 'src/app/modules/components/plus-network/plus-network.module';
import { DifferentialModule } from 'src/app/modules/components/differential/differential.module';
import { SocialPostsModule } from 'src/app/modules/components/social-posts/social-posts.module';
import { AppCareplusModule } from 'src/app/modules/components/app-careplus/app-careplus.module';
import { MaterialsModule } from 'src/app/modules/components/materials/materials.module';
import { InfoSectionModule } from 'src/app/modules/components/info-section/info-section.module';
import { IconCardsSectionModule } from 'src/app/modules/components/icon-cards-section/icon-cards-section.module';


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
        MaterialsModule
    ]
})
export class BeneficiarioModule { }
