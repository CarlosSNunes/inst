import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
// import { LoginAuthGuard } from './login-auth.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    // canActivate: [LoginAuthGuard]
  },
  {
    path: '**',
    component: LoginComponent,
    // canActivate: [LoginAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
