import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { BannerCreateComponent } from '../banner-create/banner-create.component';
import { BannerOrderComponent } from '../banner-order/banner-order.component';
import { BannerComponent } from '../banner.component';
import { BannerEditComponent } from './banner-edit.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: BannerComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: BannerCreateComponent
    },
    {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: BannerEditComponent
    },
    {
        path: 'order',
        canActivate: [AuthGuard],
        component: BannerOrderComponent
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        component: BannerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BannerRoutingModule { }
