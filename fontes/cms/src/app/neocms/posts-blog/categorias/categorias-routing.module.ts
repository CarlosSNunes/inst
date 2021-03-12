import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../../../../src/app/authentication/auth.service';
import { CategoriasComponent } from './categorias.component';
import { CategoriasCreateComponent } from './categorias-create/categorias-create.component';
import { CategoriasEditComponent } from './categorias-edit/categorias-edit.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: CategoriasComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: CategoriasCreateComponent
    },
    {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: CategoriasEditComponent
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        component: CategoriasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriasRoutingModule { }
