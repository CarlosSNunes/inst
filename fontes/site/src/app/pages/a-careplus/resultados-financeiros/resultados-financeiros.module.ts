import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadosFinanceirosComponent } from './resultados-financeiros.component';
import { ResultadosFinanceirosRoutingModule } from './resultados-financeiros-routing.module';
import { DocumentsModule } from 'src/app/modules/components/documents/documents.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { LearnMoreModule } from 'src/app/modules/components/learn-more/learn-more.module';
import { DropdownModule } from 'src/app/modules/components/dropdown/dropdown.module';
import { TableModule } from 'src/app/modules/components/table/table.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';



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
