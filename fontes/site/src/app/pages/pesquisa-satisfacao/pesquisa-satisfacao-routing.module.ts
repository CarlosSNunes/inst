import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisaSatisfacaoComponent } from './pesquisa-satisfacao.component';

const routes: Routes = [
    {
        path: '',
        component: PesquisaSatisfacaoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PesquisaSatisfacaoRoutingModule { }
