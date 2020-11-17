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
        redirectTo: '/404'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarreiraRoutingModule { }
