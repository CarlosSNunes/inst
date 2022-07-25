import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvisoDePrivacidadeComponent } from './aviso-de-privacidade.component';

const routes: Routes = [
    {
        path: '',
        component: AvisoDePrivacidadeComponent
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
export class AvisoDePrivacidadeRoutingModule { }
