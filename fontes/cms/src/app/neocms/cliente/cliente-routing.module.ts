import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { ClienteComponent } from './cliente.component';
import { ClienteCreateComponent } from './cliente-create/cliente-create.component';
import { ClienteEditComponent } from './cliente-edit/cliente-edit.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: ClienteComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: ClienteCreateComponent
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        component: ClienteEditComponent
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        component: ClienteComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClienteRoutingModule { }
