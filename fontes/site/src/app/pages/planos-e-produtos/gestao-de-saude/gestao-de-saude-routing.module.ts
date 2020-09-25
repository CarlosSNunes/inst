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
        path: 'servicos-online',
        loadChildren: () => import('./servicos-online/servicos-online.module').then(m => m.ServicosOnlineModule)
    },
    {
        path: 'personal-system',
        loadChildren: () => import('./personal-system/personal-system.module').then(m => m.PersonalSystemModule)
    },
    {
        path: 'programas-empresariais',
        loadChildren: () => import('./programas-empresariais/programas-empresariais.module').then(m => m.ProgramasEmpresariaisModule)
    },
    {
        path: 'nossas-parcerias',
        loadChildren: () => import('./nossas-parcerias/nossas-parcerias.module').then(m => m.NossasParceriasModule)
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
export class GestaoDeSaudeRoutingModule { }
