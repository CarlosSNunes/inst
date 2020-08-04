import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { WindowRef } from 'src/utils/window-ref';
import { HomeRoutingModule } from './home-routing.module';
import { BannerModule } from 'src/app/modules/components/banner/banner.module';
import { SocialPostsModule } from 'src/app/modules/components/social-posts/social-posts.module';
import { AccreditedNetworkModule } from 'src/app/modules/components/accredited-network/accredited-network.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ProductModule } from 'src/app/modules/components/product/product.module';
import { InfoSectionModule } from 'src/app/modules/components/info-section/info-section.module';
import { ACareplusVideoModule } from 'src/app/modules/components/a-careplus-video/a-careplus-video.module';
import { PlusNetworkModule } from 'src/app/modules/components/plus-network/plus-network.module';
import { DifferentialModule } from 'src/app/modules/components/differential/differential.module';
import { ProfileModule } from 'src/app/modules/components/profile/profile.module';
import { JoinTheTeamModule } from 'src/app/modules/components/join-the-team/join-the-team.module';
import { CareplusPlusModule } from 'src/app/modules/components/careplus-plus/careplus-plus.module';
import { IconCardsSectionModule } from 'src/app/modules/components/icon-cards-section/icon-cards-section.module';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        BannerModule,
        SocialPostsModule,
        AccreditedNetworkModule,
        SharedModule,
        ProductModule,
        InfoSectionModule,
        ACareplusVideoModule,
        PlusNetworkModule,
        DifferentialModule,
        ProfileModule,
        JoinTheTeamModule,
        CareplusPlusModule,
        IconCardsSectionModule
    ],
    providers: [
        WindowRef
    ]
})
export class HomeModule { }
