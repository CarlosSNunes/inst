import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcessibilidadeComponent } from './acessibilidade.component';

const routes: Routes = [
    {
        path: '',
        component: AcessibilidadeComponent
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
export class AcessibilidadeRoutingModule { }