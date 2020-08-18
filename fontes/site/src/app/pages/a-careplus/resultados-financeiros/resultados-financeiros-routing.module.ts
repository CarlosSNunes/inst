import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultadosFinanceirosComponent } from './resultados-financeiros.component';

const routes: Routes = [
    {
        path: '',
        component: ResultadosFinanceirosComponent
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
export class ResultadosFinanceirosRoutingModule { }
