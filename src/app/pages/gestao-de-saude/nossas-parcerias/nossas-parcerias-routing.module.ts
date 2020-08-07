import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NossasParceriasComponent } from './nossas-parcerias.component';

const routes: Routes = [
    {
        path: '',
        component: NossasParceriasComponent,
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
export class NossasParceriasRoutingModule { }
