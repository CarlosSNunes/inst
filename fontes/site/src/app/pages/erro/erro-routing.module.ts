import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErroComponent } from './erro.component';

const routes: Routes = [
    {
        path: '',
        component: ErroComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        component: ErroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErroRoutingModule { }