import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareplusMaisComponent } from './careplus-mais.component';
import { DetalheDoPostComponent } from './detalhe-do-post/detalhe-do-post.component';
import { BuscaComponent } from './busca/busca.component';
import { BuscaPorCategoriaComponent } from './busca-por-categoria/busca-por-categoria.component';

const routes: Routes = [
    {
        path: '',
        component: CareplusMaisComponent
    },
    {
        path: 'busca',
        component: BuscaComponent
    },
    {
        path: 'busca/:term',
        component: BuscaComponent
    },
    {
        path: 'categoria/:categoryId',
        component: BuscaPorCategoriaComponent
    },
    {
        path: ':slug',
        component: DetalheDoPostComponent
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
export class CarePlusMaisRoutingModule { }
