import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PremiosECertificacoesComponent } from './premios-e-certificacoes.component';

const routes: Routes = [
    {
        path: '',
        component: PremiosECertificacoesComponent
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
export class PremiosECertificacoesRoutingModule { }
