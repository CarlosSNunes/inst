import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './faq.component';

const routes: Routes = [
    {
        path: '',
        component: FaqComponent
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
export class FaqRoutingModule { }
