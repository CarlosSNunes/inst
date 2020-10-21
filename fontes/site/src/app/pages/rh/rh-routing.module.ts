import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RhComponent } from './rh.component';

const routes: Routes = [
    {
        path: '',
        component: RhComponent
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
export class RhRoutingModule { }
