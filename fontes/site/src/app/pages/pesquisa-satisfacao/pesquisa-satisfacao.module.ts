import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaSatisfacaoComponent } from './pesquisa-satisfacao.component';
import { PesquisaSatisfacaoRoutingModule } from './pesquisa-satisfacao-routing.module'
import { DocumentsModule, LearnMoreModule, SharedModule, SimpleBannerModule } from 'src/app/modules';


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
