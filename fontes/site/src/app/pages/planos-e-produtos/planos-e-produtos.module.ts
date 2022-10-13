import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanosEProdutosComponent } from './planos-e-produtos.component';
import { PlanosEProdutosRoutingModule } from './planos-e-produtos-routing.module';
import { ContactScheduleAVisitModule, InfoSectionModule, PlanCardModule, CommomQuestionsModule, SimpleBannerModule, AccreditedNetworkModule, CardModule, HospitalsListModule, IconCardsSectionModule, HeroBannerModule, CareplusPlusModule} from 'src/app/modules';
import { DetalhesDoProdutoComponent } from './detalhes-do-produto/detalhes-do-produto.component';
import { PlansInfosComponent } from './components/plans-infos/plans-infos.component';


@NgModule({
    declarations: [PlanosEProdutosComponent, DetalhesDoProdutoComponent, PlansInfosComponent,],
    imports: [
        CommonModule,
        PlanosEProdutosRoutingModule,
        IconCardsSectionModule,
        ContactScheduleAVisitModule,
        InfoSectionModule,
        PlanCardModule,
        CareplusPlusModule,
        CommomQuestionsModule,
        SimpleBannerModule,
        AccreditedNetworkModule,
        CardModule,
        HospitalsListModule,
        HeroBannerModule,                
    ]
})
export class PlanosEProdutosModule { }
