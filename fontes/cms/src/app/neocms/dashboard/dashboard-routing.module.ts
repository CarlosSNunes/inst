import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: DashboardComponent
    },    
    {
        path: '**',
        canActivate: [AuthGuard],
        component: DashboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
