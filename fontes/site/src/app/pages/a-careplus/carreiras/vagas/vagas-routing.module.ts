import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VagasComponent } from './vagas.component';
import { DetalhesComponent } from './detalhes/detalhes.component';

const routes: Routes = [
    {
        path: '',
        component: VagasComponent
    },
    {
        path: ':id',
        component: DetalhesComponent
    },
    {
        path: '**',
        loadChildren: () => import('../../../erro/erro.module').then(m => m.ErroModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VagasRoutingModule { }
