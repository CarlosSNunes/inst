import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACareplusVideoComponent } from './a-careplus-video.component';
import { SharedModule } from '../../shared/shared.module';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
    declarations: [ACareplusVideoComponent, SafePipe],
    imports: [
        CommonModule,
        SharedModule,
    ],
    exports: [ACareplusVideoComponent]
})
export class ACareplusVideoModule { }
