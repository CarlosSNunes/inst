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
        redirectTo: '/404'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CredenciadoRoutingModule { }
