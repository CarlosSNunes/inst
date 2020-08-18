import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
    entryComponents: [NotificationComponent],
    declarations: [NotificationComponent],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        NotificationComponent
    ]
})
export class NotificationModule { }
