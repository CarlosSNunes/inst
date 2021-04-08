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
        redirectTo: '/404'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NossasParceriasRoutingModule { }
