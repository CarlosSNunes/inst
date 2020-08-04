import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorretorComponent } from './corretor.component';
import { BannerModule } from 'src/app/modules/components/banner/banner.module';
import { ProductModule } from 'src/app/modules/components/product/product.module';
import { DifferentialModule } from 'src/app/modules/components/differential/differential.module';
import { AccreditedNetworkModule } from 'src/app/modules/components/accredited-network/accredited-network.module';
import { CorretorRoutingModule } from './corretor-routing.module';
import { InfoSectionModule } from 'src/app/modules/components/info-section/info-section.module';
import { MaterialsModule } from 'src/app/modules/components/materials/materials.module';
import { SocialPostsModule } from 'src/app/modules/components/social-posts/social-posts.module';
import { CareplusPlusModule } from 'src/app/modules/components/careplus-plus/careplus-plus.module';
import { IconCardsSectionModule } from 'src/app/modules/components/icon-cards-section/icon-cards-section.module';


@NgModule({
    declarations: [CorretorComponent],
    imports: [
        CommonModule,
        CorretorRoutingModule,
        BannerModule,
        ProductModule,
        DifferentialModule,
        AccreditedNetworkModule,
        IconCardsSectionModule,
        InfoSectionModule,
        MaterialsModule,
        SocialPostsModule,
        CareplusPlusModule
    ]
})
export class CorretorModule { }
