import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramasEmpresariaisComponent } from './programas-empresariais.component';
import { ProgramasEmpresariaisRoutingComponent } from './programas-empresariais-routing.module';
import { CareplusPlusModule, IconCardsSectionModule, InfoSectionModule, SimpleBannerModule } from 'src/app/modules';



@NgModule({
    declarations: [ProgramasEmpresariaisComponent],
    imports: [
        CommonModule,
        ProgramasEmpresariaisRoutingComponent,
        SimpleBannerModule,
        InfoSectionModule,
        IconCardsSectionModule,
        CareplusPlusModule
    ]
})
export class ProgramasEmpresariaisModule { }
