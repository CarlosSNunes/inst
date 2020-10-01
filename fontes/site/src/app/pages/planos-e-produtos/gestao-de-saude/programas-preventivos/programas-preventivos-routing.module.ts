import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramasPreventivosComponent } from './programas-preventivos.component';

const routes: Routes = [
    {
        path: '',
        component: ProgramasPreventivosComponent,
    },
    {
        path: '**',
        loadChildren: () => import('src/app/pages/erro/erro.module').then(m => m.ErroModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProgramasPreventivosRoutingModule { }
