import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarreirasComponent } from './carreiras.component';
import { ConsultaFacilComponent } from './consulta-facil/consulta-facil.component';

const routes: Routes = [
    {
        path: '',
        component: CarreirasComponent,
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
