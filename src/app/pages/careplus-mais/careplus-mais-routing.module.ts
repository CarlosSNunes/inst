import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareplusMaisComponent } from './careplus-mais.component';
import { DetalheDoPostComponent } from './detalhe-do-post/detalhe-do-post.component';
import { BuscaComponent } from './busca/busca.component';

const routes: Routes = [
    {
        path: '',
        component: CareplusMaisComponent
    },
    {
        path: 'busca/:termo',
        component: BuscaComponent
    },
    {
        path: ':slug',
        component: DetalheDoPostComponent
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
export class CarePlusMaisRoutingModule { }
