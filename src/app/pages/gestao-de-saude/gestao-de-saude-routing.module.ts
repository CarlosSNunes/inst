import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestaoDeSaudeComponent } from './gestao-de-saude.component';
const routes: Routes = [
    {
        path: '',
        component: GestaoDeSaudeComponent
    },
    {
        path: 'programas-preventivos',
        loadChildren: () => import('./programas-preventivos/programas-preventivos.module').then(m => m.ProgramasPreventivosModule)
    },
    {
        path: 'personal-system',
        loadChildren: () => import('./personal-system/personal-system.module').then(m => m.PersonalSystemModule)
    },
    {
        path: '**',
        loadChildren: () => import('../erro/erro.module').then(m => m.ErroModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestaoDeSaudeRoutingModule { }
