import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorretorComponent } from './corretor.component';
import { BannerModule, ProductModule, DifferentialModule, AccreditedNetworkModule, InfoSectionModule, MaterialsModule, SocialPostsModule, IconCardsSectionModule } from 'src/app/modules';
import { CorretorRoutingModule } from './corretor-routing.module';


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
        
    ]
})
export class CorretorModule { }
