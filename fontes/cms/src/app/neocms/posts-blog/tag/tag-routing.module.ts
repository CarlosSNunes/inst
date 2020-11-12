import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { TagComponent } from './tag.component';
import { TagCreateComponent } from './tag-create/tag-create.component';
import { TagEditComponent } from './tag-edit/tag-edit.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: TagComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: TagCreateComponent
    },
    {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: TagEditComponent
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        component: TagComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TagRoutingModule { }
