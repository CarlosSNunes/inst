import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { NeocmsMenuLateralComponent } from './neocms-menu-lateral.component';

const routes: Routes = [
  {
    path: '',
    component: NeocmsMenuLateralComponent,
  },
  {
    path: '**',
    component: NeocmsMenuLateralComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeocmsMenuLateralRoutingModule { }
