import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'beneficiario',
        loadChildren: () => import('src/app/pages/home/beneficiario/beneficiario.module').then(m => m.BeneficiarioModule),
    },
    {
        path: 'rh',
        loadChildren: () => import('src/app/pages/home/rh/rh.module').then(m => m.RhModule),
    },
    {
        path: 'corretor',
        loadChildren: () => import('src/app/pages/home/corretor/corretor.module').then(m => m.CorretorModule),
    },
    {
        path: 'credenciado',
        loadChildren: () => import('src/app/pages/home/credenciado/credenciado.module').then(m => m.CredenciadoModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
