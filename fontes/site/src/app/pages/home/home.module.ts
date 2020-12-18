import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { WindowRef } from 'src/utils/window-ref';
import { HomeRoutingModule } from './home-routing.module';
import { BannerModule, SocialPostsModule, AccreditedNetworkModule, SharedModule, ProductModule, InfoSectionModule, ACareplusVideoModule, PlusNetworkModule, DifferentialModule, ProfileModule, JoinTheTeamModule, IconCardsSectionModule, CareplusPlusModule } from 'src/app/modules';

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
