import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { SharedModule } from '../../shared/shared.module';
import { SafePipeModule } from 'src/app/pipes/safe-pipe/safe-pipe.module';

@NgModule({
    entryComponents: [ModalComponent],
    declarations: [ModalComponent],
    imports: [
        CommonModule,
        SharedModule,
        SafePipeModule,
    ],
    exports: [
        ModalComponent
    ]
})
export class ModalModule { }
