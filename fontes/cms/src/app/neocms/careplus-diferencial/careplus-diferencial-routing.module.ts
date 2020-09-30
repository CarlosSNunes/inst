import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { CareplusDiferencialComponent } from './careplus-diferencial.component';
import { CareplusDiferencialCreateComponent } from './careplus-diferencial-create/careplus-diferencial-create.component';
import { CareplusDiferencialEditComponent } from './careplus-diferencial-edit/careplus-diferencial-edit.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: CareplusDiferencialComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: CareplusDiferencialCreateComponent
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        component: CareplusDiferencialEditComponent
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        component: CareplusDiferencialComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CareplusDiferencialRoutingModule { }
