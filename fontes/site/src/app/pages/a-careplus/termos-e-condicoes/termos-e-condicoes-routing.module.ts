import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermosECondicoesComponent } from './termos-e-condicoes.component';

const routes: Routes = [
    {
        path: '',
        component: TermosECondicoesComponent
    },
    {
        path: '**',
        loadChildren: () => import('../../erro/erro.module').then(m => m.ErroModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TermosECondicoesRoutingModule { }
