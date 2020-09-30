import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { CareplusPerfilComponent } from './careplus-perfil.component';
import { CareplusPerfilCreateComponent } from './careplus-perfil-create/careplus-perfil-create.component';
import { CareplusPerfilEditComponent } from './careplus-perfil-edit/careplus-perfil-edit.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: CareplusPerfilComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: CareplusPerfilCreateComponent
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        component: CareplusPerfilEditComponent
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        component: CareplusPerfilComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CareplusPerfilRoutingModule { }
