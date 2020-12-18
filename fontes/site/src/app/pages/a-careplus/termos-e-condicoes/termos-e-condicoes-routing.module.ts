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
        redirectTo: '/404'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TermosECondicoesRoutingModule { }
