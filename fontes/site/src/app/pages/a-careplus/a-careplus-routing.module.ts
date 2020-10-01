import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ACareplusComponent } from './a-careplus.component';

const routes: Routes = [
    {
        path: '',
        component: ACareplusComponent
    },
    {
        path: 'materiais-de-saude',
        loadChildren: () => import('./materiais/materiais.module').then(m => m.MateriaisModule)
    },
    {
        path: 'responsabilidade-social',
        loadChildren: () => import('./responsabilidade-social/responsabilidade-social.module').then(m => m.ResponsabilidadeSocialModule)
    },
    {
        path: 'perguntas-frequentes',
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
        path: 'diferenciais',
        loadChildren: () => import('./diferenciais/diferenciais.module').then(m => m.DiferenciaisModule)
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
