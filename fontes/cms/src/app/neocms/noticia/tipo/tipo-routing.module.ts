import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { TipoComponent } from './tipo.component';
import { TipoCreateComponent } from './tipo-create/tipo-create.component';
import { TipoEditComponent } from './tipo-edit/tipo-edit.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: TipoComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: TipoCreateComponent
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        component: TipoEditComponent
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        component: TipoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TipoRoutingModule { }
