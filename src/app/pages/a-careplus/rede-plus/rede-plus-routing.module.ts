import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedePlusComponent } from './rede-plus.component';

const routes: Routes = [
    {
        path: '',
        component: RedePlusComponent
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
export class RedePlusRountingModule { }
