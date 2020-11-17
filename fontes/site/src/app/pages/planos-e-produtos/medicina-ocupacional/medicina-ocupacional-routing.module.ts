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
        redirectTo: '/404'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MedicinaOcupacionalRoutingModule { }
