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
        redirectTo: '/404'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResultadosFinanceirosRoutingModule { }
