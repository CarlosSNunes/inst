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
        redirectTo: '/404'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RedePlusRountingModule { }
