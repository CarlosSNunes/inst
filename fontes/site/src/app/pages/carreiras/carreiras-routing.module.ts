import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarreirasComponent } from './carreiras.component';

const routes: Routes = [
    {
        path: '',
        component: CarreirasComponent
    },
    {
        path: 'vagas',
        loadChildren: () => import('./vagas/vagas.module').then(m => m.VagasModule)
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
export class CarreiraRoutingModule { }
