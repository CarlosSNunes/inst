import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanosEProdutosComponent } from './planos-e-produtos.component';
import { PlanosEProdutosRoutingModule } from './planos-e-produtos-routing.module';
import { ContactScheduleAVisitModule } from 'src/app/modules/components/contact-schedule-a-visit/contact-schedule-a-visit.module';
import { InfoSectionModule } from 'src/app/modules/components/info-section/info-section.module';
import { PlanCardModule } from 'src/app/modules/components/plan-card/plan-card.module';
import { CommomQuestionsModule } from 'src/app/modules/components/commom-questions/commom-questions.module';
import { DetalhesDoProdutoComponent } from './detalhes-do-produto/detalhes-do-produto.component';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';
import { AccreditedNetworkModule } from 'src/app/modules/components/accredited-network/accredited-network.module';
import { PlansInfosComponent } from './components/plans-infos/plans-infos.component';
import { CardModule } from 'src/app/modules/components/card/card.module';
import { HospitalsListModule } from 'src/app/modules/components/hospitals-list/hospitals-list.module';
import { IconCardsSectionModule } from 'src/app/modules/components/icon-cards-section/icon-cards-section.module';
import { HeroBannerModule } from 'src/app/modules/components/hero-banner/hero-banner.module';


@NgModule({
    declarations: [PlanosEProdutosComponent, DetalhesDoProdutoComponent, PlansInfosComponent],
    imports: [
        CommonModule,
        PlanosEProdutosRoutingModule,
        IconCardsSectionModule,
        ContactScheduleAVisitModule,
        InfoSectionModule,
        PlanCardModule,
        
        CommomQuestionsModule,
        SimpleBannerModule,
        AccreditedNetworkModule,
        CardModule,
        HospitalsListModule,
        HeroBannerModule
    ]
})
export class PlanosEProdutosModule { }
