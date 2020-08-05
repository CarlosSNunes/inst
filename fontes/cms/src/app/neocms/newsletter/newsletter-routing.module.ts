import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { NewsletterComponent } from './newsletter.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: NewsletterComponent
    },    
    {
        path: '**',
        canActivate: [AuthGuard],
        component: NewsletterComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewsletterRoutingModule { }
