import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaSatisfacaoComponent } from './pesquisa-satisfacao.component';
import { PesquisaSatisfacaoRoutingModule } from './pesquisa-satisfacao-routing.module'
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { LearnMoreModule } from 'src/app/modules/components/learn-more/learn-more.module';
import { DocumentsModule } from 'src/app/modules/components/documents/documents.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';


@NgModule({
    declarations: [PesquisaSatisfacaoComponent],
    imports: [
        CommonModule,
        PesquisaSatisfacaoRoutingModule,
        LearnMoreModule,
        SharedModule,
        DocumentsModule,
        SimpleBannerModule
    ]
})
export class PesquisaSatisfacaoModule { }
