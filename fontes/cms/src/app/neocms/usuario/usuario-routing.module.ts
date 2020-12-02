import { UsuarioComponent } from './usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../../../src/app/authentication/auth.service';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
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
  // {
  //   path: 'edit/:id',
  //   canActivate: [AuthGuard],
  //   component: UsuarioUpdateComponent
  // },
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
