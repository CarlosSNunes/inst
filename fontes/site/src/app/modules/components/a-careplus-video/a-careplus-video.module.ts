import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACareplusVideoComponent } from './a-careplus-video.component';
import { SharedModule } from '../../shared/shared.module';
import { SafePipeModule } from 'src/app/pipes/safe-pipe/safe-pipe.module';

@NgModule({
    declarations: [ACareplusVideoComponent],
    imports: [
        CommonModule,
        SharedModule,
        SafePipeModule
    ],
    exports: [ACareplusVideoComponent]
})
export class ACareplusVideoModule { }
