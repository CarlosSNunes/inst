import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramasEmpresariaisComponent } from './programas-empresariais.component';

const routes: Routes = [
    {
        path: '',
        component: ProgramasEmpresariaisComponent,
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
export class ProgramasEmpresariaisRoutingComponent { }
