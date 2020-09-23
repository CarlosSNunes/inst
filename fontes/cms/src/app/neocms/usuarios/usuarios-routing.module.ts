import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { UsuariosComponent } from './usuarios.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: UsuariosComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: UsuarioCreateComponent
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        component: UsuarioEditComponent
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        component: UsuariosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }
