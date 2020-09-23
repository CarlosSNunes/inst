import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarreirasComponent } from './carreiras.component';
import { CarreiraRoutingModule } from './carreiras-routing.module';
import { ACareplusVideoModule } from 'src/app/modules/components/a-careplus-video/a-careplus-video.module';
import { InfoSectionModule } from 'src/app/modules/components/info-section/info-section.module';
import { JoinTheTeamModule } from 'src/app/modules/components/join-the-team/join-the-team.module';
import { LearnMoreModule } from 'src/app/modules/components/learn-more/learn-more.module';
import { SocialPostsModule } from 'src/app/modules/components/social-posts/social-posts.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';


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
    ]
})
export class CarreirasModule { }
