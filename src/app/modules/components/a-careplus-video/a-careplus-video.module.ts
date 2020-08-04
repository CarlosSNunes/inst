import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACareplusVideoComponent } from './a-careplus-video.component';
import { SharedModule } from '../../shared/shared.module';
import { VgCoreModule } from 'videogular2/compiled/src/core/core';
import { VgControlsModule } from 'videogular2/compiled/src/controls/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/src/overlay-play/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/src/buffering/buffering';


@NgModule({
    declarations: [ACareplusVideoComponent],
    imports: [
        CommonModule,
        SharedModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule
    ],
    exports: [ACareplusVideoComponent]
})
export class ACareplusVideoModule { }
