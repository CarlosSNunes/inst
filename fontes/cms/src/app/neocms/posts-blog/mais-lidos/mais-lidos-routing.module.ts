import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { MaisLidosComponent } from './mais-lidos.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: MaisLidosComponent
    }, 
    {
        path: '**',
        canActivate: [AuthGuard],
        component: MaisLidosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaisLidosRoutingModule { }
