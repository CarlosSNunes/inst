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
        redirectTo: '/404'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ObrigadoRoutingModule { }
