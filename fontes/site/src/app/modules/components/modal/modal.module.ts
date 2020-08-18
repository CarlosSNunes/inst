import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
    entryComponents: [ModalComponent],
    declarations: [ModalComponent],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        ModalComponent
    ]
})
export class ModalModule { }
