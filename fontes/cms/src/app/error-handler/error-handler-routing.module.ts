import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorHandlerComponent } from './error-handler.component';
import { LoginAuthGuard } from '../login/login-auth.service';

const routes: Routes = [
    {
        path: '',
        component: ErrorHandlerComponent,
        canActivate: [LoginAuthGuard]
    },
    {
        path: '**',
        component: ErrorHandlerComponent,
        canActivate: [LoginAuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorHandlerRoutingModule { }
