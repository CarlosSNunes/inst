import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicosOnlineComponent } from './servicos-online.component';

const routes: Routes = [
    {
        path: '',
        component: ServicosOnlineComponent,
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
export class ServicosOnlineRoutingModule { }
