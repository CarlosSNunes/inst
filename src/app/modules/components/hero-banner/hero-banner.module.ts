import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from './hero-banner.component';
import { VgCoreModule } from 'videogular2/compiled/src/core/core';
import { VgControlsModule } from 'videogular2/compiled/src/controls/controls';
import { VgBufferingModule } from 'videogular2/compiled/src/buffering/buffering';
import { VgOverlayPlayModule } from 'videogular2/compiled/src/overlay-play/overlay-play';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';



@NgModule({
    declarations: [HeroBannerComponent],
    imports: [
        CommonModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        BreadcrumbModule,
    ],
    exports: [
        HeroBannerComponent
    ]
})
export class HeroBannerModule { }
