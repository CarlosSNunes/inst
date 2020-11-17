import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VagasComponent } from './vagas.component';

const routes: Routes = [
    {
        path: '',
        component: VagasComponent
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
export class VagasRoutingModule { }
