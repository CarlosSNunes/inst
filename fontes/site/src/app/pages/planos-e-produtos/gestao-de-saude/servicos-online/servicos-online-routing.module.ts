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
        loadChildren: () => import('src/app/pages/erro/erro.module').then(m => m.ErroModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServicosOnlineRoutingModule { }
