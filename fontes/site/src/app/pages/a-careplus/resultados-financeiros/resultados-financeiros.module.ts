import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadosFinanceirosComponent } from './resultados-financeiros.component';
import { ResultadosFinanceirosRoutingModule } from './resultados-financeiros-routing.module';
import { DocumentsModule, SharedModule, LearnMoreModule, DropdownModule, TableModule, SimpleBannerModule } from 'src/app/modules';

@NgModule({
    declarations: [ResultadosFinanceirosComponent],
    imports: [
        CommonModule,
        ResultadosFinanceirosRoutingModule,
        DocumentsModule,
        LearnMoreModule,
        SharedModule,
        DropdownModule,
        TableModule,
        SimpleBannerModule
    ]
})
export class ResultadosFinanceirosModule { }
