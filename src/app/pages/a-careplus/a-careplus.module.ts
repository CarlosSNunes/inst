import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACareplusComponent } from './a-careplus.component';
import { ACareplusRoutingModule } from './a-careplus-routing.module';
import { VgCoreModule } from 'videogular2/compiled/src/core/core';
import { VgControlsModule } from 'videogular2/compiled/src/controls/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/src/overlay-play/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/src/buffering/buffering';
import { SliderModule } from 'src/app/modules/components/slider/slider.module';
import { CardModule } from 'src/app/modules/components/card/card.module';
import { CareplusPlusModule } from 'src/app/modules/components/careplus-plus/careplus-plus.module';
import { SocialPostsModule } from 'src/app/modules/components/social-posts/social-posts.module';
import { BreadcrumbModule } from 'src/app/modules/components/breadcrumb/breadcrumb.module';
import { HeroBannerModule } from 'src/app/modules/components/hero-banner/hero-banner.module';

@NgModule({
    declarations: [
        ACareplusComponent,
    ],
    imports: [
        CommonModule,
        ACareplusRoutingModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        SliderModule,
        CardModule,
        CareplusPlusModule,
        SocialPostsModule,
        BreadcrumbModule,
        HeroBannerModule
    ]
})
export class ACareplusModule { }
