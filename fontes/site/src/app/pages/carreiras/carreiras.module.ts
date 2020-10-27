import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarreirasComponent } from './carreiras.component';
import { CarreiraRoutingModule } from './carreiras-routing.module';
import { ACareplusVideoModule, InfoSectionModule, JoinTheTeamModule, LearnMoreModule, SocialPostsModule, SimpleBannerModule, CareplusPlusModule } from 'src/app/modules';

@NgModule({
    declarations: [CarreirasComponent],
    imports: [
        CommonModule,
        SimpleBannerModule,
        CarreiraRoutingModule,
        ACareplusVideoModule,
        InfoSectionModule,
        JoinTheTeamModule,
        LearnMoreModule,
        SocialPostsModule,
        CareplusPlusModule
    ]
})
export class CarreirasModule { }
