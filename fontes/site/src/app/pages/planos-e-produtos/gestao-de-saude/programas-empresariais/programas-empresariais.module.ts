import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramasEmpresariaisComponent } from './programas-empresariais.component';
import { ProgramasEmpresariaisRoutingComponent } from './programas-empresariais-routing.module';
import { IconCardsSectionModule, InfoSectionModule, SimpleBannerModule } from 'src/app/modules';



@NgModule({
    declarations: [ProgramasEmpresariaisComponent],
    imports: [
        CommonModule,
        ProgramasEmpresariaisRoutingComponent,
        SimpleBannerModule,
        InfoSectionModule,
        IconCardsSectionModule,

    ]
})
export class ProgramasEmpresariaisModule { }
