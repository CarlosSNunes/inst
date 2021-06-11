import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanosEProdutosComponent } from './planos-e-produtos.component';
import { DetalhesDoProdutoComponent } from './detalhes-do-produto/detalhes-do-produto.component';

const routes: Routes = [
    {
        path: '',
        component: PlanosEProdutosComponent,
    },
    {
        path: 'gestao-de-saude',
        pathMatch: 'full',
        redirectTo: '/a-careplus/gestao-de-saude'
    },
    {
        path: 'gestao-de-saude/programas-preventivos',
        pathMatch: 'full',
        redirectTo: '/a-careplus/gestao-de-saude/programas-preventivos'
    },
    {
        path: 'gestao-de-saude/servicos-online',
        pathMatch: 'full',
        redirectTo: '/a-careplus/gestao-de-saude/servicos-online'
    },
    {
        path: 'gestao-de-saude/personal-system',
        pathMatch: 'full',
        redirectTo: '/a-careplus/gestao-de-saude/personal-system'
    },
    {
        path: 'gestao-de-saude/programas-empresariais',
        pathMatch: 'full',
        redirectTo: '/a-careplus/gestao-de-saude/programas-empresariais'
    },
    {
        path: 'gestao-de-saude/nossas-parcerias',
        pathMatch: 'full',
        redirectTo: '/a-careplus/gestao-de-saude/nossas-parcerias'
    },
    {
        path: 'medicina-ocupacional',
        loadChildren: () => import('./medicina-ocupacional/medicina-ocupacional.module').then(m => m.MedicinaOcupacionalModule)
    },
    {
        path: ':id',
        component: DetalhesDoProdutoComponent,
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
export class PlanosEProdutosRoutingModule { }
