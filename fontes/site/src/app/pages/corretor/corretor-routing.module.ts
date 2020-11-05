import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorretorComponent } from './corretor.component';

const routes: Routes = [
    {
        path: '',
        component: CorretorComponent
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
export class CorretorRoutingModule { }
