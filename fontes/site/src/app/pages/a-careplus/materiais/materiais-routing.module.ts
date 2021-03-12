import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MateriaisComponent } from './materiais.component';

const routes: Routes = [
    {
        path: '',
        component: MateriaisComponent
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
export class MateriaisRoutingModule { }
