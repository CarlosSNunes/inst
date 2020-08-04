import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentosComponent } from './documentos.component';

const routes: Routes = [
    {
        path: '',
        component: DocumentosComponent
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
export class DocumentosRoutingModule { }
