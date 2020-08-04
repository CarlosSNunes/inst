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
        path: 'medicina-ocupacional',
        loadChildren: () => import('./medicina-ocupacional/medicina-ocupacional.module').then(m => m.MedicinaOcupacionalModule)
    },
    {
        path: ':id',
        component: DetalhesDoProdutoComponent,
    },
    {
        path: '**',
        loadChildren: () => import('src/app/pages/erro/erro.module').then(m => m.ErroModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlanosEProdutosRoutingModule { }
