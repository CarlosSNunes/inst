import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredenciadoComponent } from './credenciado.component';

const routes: Routes = [
    {
        path: '',
        component: CredenciadoComponent
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
export class CredenciadoRoutingModule { }
