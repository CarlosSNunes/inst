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
        path: 'gestao-de-saude',
        loadChildren: () => import('../a-careplus/gestao-de-saude/gestao-de-saude.module').then(m => m.GestaoDeSaudeModule),
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
        path: 'aviso-de-privacidade',
        loadChildren: () => import('./aviso-de-privacidade/aviso-de-privacidade.module').then(m => m.AvisoDePrivacidadeModule)
    },
    {
        path: 'acessibilidade',
        loadChildren: () => import('./acessibilidade/acessibilidade.module').then(m => m.AcessibilidadeModule)
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
        redirectTo: '/404'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ACareplusRoutingModule { }
