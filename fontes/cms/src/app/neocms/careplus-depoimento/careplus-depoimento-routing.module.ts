import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { CareplusDepoimentoComponent } from './careplus-depoimento.component';
import { CareplusDepoimentoCreateComponent } from './careplus-depoimento-create/careplus-depoimento-create.component';
import { CareplusDepoimentoEditComponent } from './careplus-depoimento-edit/careplus-depoimento-edit.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: CareplusDepoimentoComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: CareplusDepoimentoCreateComponent
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        component: CareplusDepoimentoEditComponent
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        component: CareplusDepoimentoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CareplusDepoimentoRoutingModule { }
