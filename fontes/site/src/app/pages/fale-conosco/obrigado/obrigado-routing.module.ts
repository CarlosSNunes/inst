import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObrigadoComponent } from './obrigado.component';

const routes: Routes = [
    {
        path: '',
        component: ObrigadoComponent
    },
    {
        path: ':protocol',
        component: ObrigadoComponent
    },
    {
        path: '**',
        loadChildren: () => import('src/app/pages/erro/erro.module').then(m => m.ErroModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ObrigadoRoutingModule { }
