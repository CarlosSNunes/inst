import { UsuarioComponent } from './usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../../../src/app/authentication/auth.service';
import { UsuarioUpdateComponent } from './usuario-update/usuario-update.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: UsuarioComponent
  },
  // {
  //   path: 'create',
  //   canActivate: [AuthGuard],
  //   component: UsuarioCreateComponent
  // },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    component: UsuarioUpdateComponent
  },
  {
    path: ':tokenAtivacao',
    canActivate: [AuthGuard],
    component: UsuarioComponent
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: UsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
