import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermosECondicoesComponent } from './termos-e-condicoes.component';
import { TermosECondicoesRoutingModule } from './termos-e-condicoes-routing.module';
import { LearnMoreModule, SidebarModule } from 'src/app/modules';

@NgModule({
    declarations: [TermosECondicoesComponent],
    imports: [
        CommonModule,
        TermosECondicoesRoutingModule,
        LearnMoreModule,
        SidebarModule
    ]
})
export class TermosECondicoesModule { }
