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
        redirectTo: '/404'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CorretorRoutingModule { }
