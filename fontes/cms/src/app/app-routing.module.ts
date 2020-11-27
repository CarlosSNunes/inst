import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/auth.service';
import { BlankContainerComponent } from './layout/blank-container/blank-container.component';
import { ContainerComponent } from './layout/container/container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'neocms',
    component:ContainerComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./neocms/neocms.module').then(m => m.NeocmsModule)
  },
  {
    path: 'login',
    component:BlankContainerComponent,
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    redirectTo: '/neocms'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
