import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicinaOcupacionalComponent } from './medicina-ocupacional.component';


const routes: Routes = [
    {
        path: '',
        component: MedicinaOcupacionalComponent,
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
export class MedicinaOcupacionalRoutingModule { }
