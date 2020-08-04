import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ACareplusComponent } from './a-careplus.component';

const routes: Routes = [
    {
        path: '',
        component: ACareplusComponent
    },
    {
        path: 'documentos',
        loadChildren: () => import('./documentos/documentos.module').then(m => m.DocumentosModule)
    },
    {
        path: 'premios-e-certificacoes',
        loadChildren: () => import('./premios-e-certificacoes/premios-e-certificacoes.module').then(m => m.PremiosECertificacoesModule)
    },
    {
        path: 'responsabilidade-social',
        loadChildren: () => import('./responsabilidade-social/responsabilidade-social.module').then(m => m.ResponsabilidadeSocialModule)
    },
    {
        path: 'faq',
        loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule)
    },
    {
        path: 'resultados-financeiros',
        loadChildren: () => import('./resultados-financeiros/resultados-financeiros.module').then(m => m.ResultadosFinanceirosModule)
    },
    {
        path: 'termos-e-condicoes',
        loadChildren: () => import('./termos-e-condicoes/termos-e-condicoes.module').then(m => m.TermosECondicoesModule)
    },
    {
        path: 'politica-de-privacidade',
        loadChildren: () => import('./politica-de-privacidade/politica-de-privacidade.module').then(m => m.PoliticaDePrivacidadeModule)
    },
    {
        path: 'rede-plus',
        loadChildren: () => import('./rede-plus/rede-plus.module').then(m => m.RedePlusModule)
    },
    {
        path: 'carreiras',
        loadChildren: () => import('./carreiras/carreiras.module').then(m => m.CarreirasModule)
    },
    {
        path: '**',
        loadChildren: () => import('../erro/erro.module').then(m => m.ErroModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ACareplusRoutingModule { }
