import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermosECondicoesComponent } from './termos-e-condicoes.component';
import { TermosECondicoesRoutingModule } from './termos-e-condicoes-routing.module';
import { LearnMoreModule } from 'src/app/modules/components/learn-more/learn-more.module';
import { SidebarModule } from 'src/app/modules/components/sidebar/sidebar.module';


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
