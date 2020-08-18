import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalsListComponent } from './hospitals-list.component';
import { SharedModule } from '../../shared/shared.module';
import { DropdownModule } from '../dropdown/dropdown.module';



@NgModule({
    declarations: [HospitalsListComponent],
    imports: [
        CommonModule,
        SharedModule,
        DropdownModule
    ],
    exports: [
        HospitalsListComponent
    ]
})
export class HospitalsListModule { }
