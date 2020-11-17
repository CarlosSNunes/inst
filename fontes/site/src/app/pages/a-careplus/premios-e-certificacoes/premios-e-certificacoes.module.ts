import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PremiosECertificacoesComponent } from './premios-e-certificacoes.component';
import { PremiosECertificacoesRoutingModule } from './premios-e-certificacoes-routing.module';
import { CardModule, LearnMoreModule, SimpleBannerModule } from 'src/app/modules';



@NgModule({
    declarations: [PremiosECertificacoesComponent],
    imports: [
        CommonModule,
        PremiosECertificacoesRoutingModule,
        CardModule,
        LearnMoreModule,
        SimpleBannerModule
    ]
})
export class PremiosECertificacoesModule { }
