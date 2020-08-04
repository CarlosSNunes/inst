import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PremiosECertificacoesComponent } from './premios-e-certificacoes.component';
import { PremiosECertificacoesRoutingModule } from './premios-e-certificacoes-routing.module';
import { CardModule } from 'src/app/modules/components/card/card.module';
import { LearnMoreModule } from 'src/app/modules/components/learn-more/learn-more.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';



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
