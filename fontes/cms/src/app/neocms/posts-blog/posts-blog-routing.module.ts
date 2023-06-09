import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { PostsBlogComponent } from './posts-blog.component';
import { PostsBlogEditComponent } from './posts-blog-edit/posts-blog-edit.component';
import { PostsBlogCreateComponent } from './posts-blog-create/posts-blog-create.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full',
        canActivate: [AuthGuard],
    },
    {
        path: 'index',
        canActivate: [AuthGuard],
        component: PostsBlogComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: PostsBlogCreateComponent
    },
    {
        path: 'categorias',
        canActivate: [AuthGuard],
        loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule)
    },
    {
        path: 'tag',
        canActivate: [AuthGuard],
        loadChildren: () => import('./tag/tag.module').then(m => m.TagModule)
    },
    {
        path: 'mais-lidos',
        canActivate: [AuthGuard],
        loadChildren: () => import('./mais-lidos/mais-lidos.module').then(m => m.MaisLidosModule)
    },
    {
        path: 'preview/:slug',
        canActivate: [AuthGuard],
        component: PostPreviewComponent
    },
    {
        path: 'edit/:slug',
        canActivate: [AuthGuard],
        component: PostsBlogEditComponent
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        component: PostsBlogComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostsBlogRoutingModule { }
