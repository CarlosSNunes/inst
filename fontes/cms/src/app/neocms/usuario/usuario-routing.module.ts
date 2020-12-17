import { UsuarioComponent } from './usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../../../src/app/authentication/auth.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: UsuarioComponent
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
