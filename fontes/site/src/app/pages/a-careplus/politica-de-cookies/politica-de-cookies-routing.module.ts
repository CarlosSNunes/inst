import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoliticaDeCookiesComponent } from './politica-de-cookies.component';

const routes: Routes = [
    {
        path: '',
        component: PoliticaDeCookiesComponent
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
export class PoliticaDeCookiesRoutingModule { }
