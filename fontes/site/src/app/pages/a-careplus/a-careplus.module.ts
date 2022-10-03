import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACareplusComponent } from './a-careplus.component';
import { ACareplusRoutingModule } from './a-careplus-routing.module';
import { VgCoreModule } from 'videogular2/compiled/src/core/core';
import { VgControlsModule } from 'videogular2/compiled/src/controls/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/src/overlay-play/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/src/buffering/buffering';
import { SliderModule, CardModule, SocialPostsModule, BreadcrumbModule, HeroBannerModule, CareplusPlusModule } from 'src/app/modules';
import { AcessibilidadeComponent } from './acessibilidade/acessibilidade.component';

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
