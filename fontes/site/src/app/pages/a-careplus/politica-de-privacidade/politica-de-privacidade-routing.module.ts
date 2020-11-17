import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoliticaDePrivacidadeComponent } from './politica-de-privacidade.component';

const routes: Routes = [
    {
        path: '',
        component: PoliticaDePrivacidadeComponent
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
export class PoliticaDePrivacidadeRoutingModule { }
