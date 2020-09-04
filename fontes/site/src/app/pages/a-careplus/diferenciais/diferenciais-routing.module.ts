import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiferenciaisComponent } from './diferenciais.component';
import { ConsultaFacilComponent } from './consulta-facil/consulta-facil.component';

const routes: Routes = [
    {
        path: '',
        component: DiferenciaisComponent,
    },
    {
        path: 'consulta-facil',
        component: ConsultaFacilComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarreirasRoutingModule { }
