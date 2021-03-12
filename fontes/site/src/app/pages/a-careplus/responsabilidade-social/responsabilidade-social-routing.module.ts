import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResponsabilidadeSocialComponent } from './responsabilidade-social.component';

const routes: Routes = [
    {
        path: '',
        component: ResponsabilidadeSocialComponent
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
export class ResponsabilidadeSocialRoutingModule { }
