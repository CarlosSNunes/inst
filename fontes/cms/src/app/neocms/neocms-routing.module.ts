import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../authentication/auth.service';
import { NeocmsComponent } from './neocms.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: NeocmsComponent,
  },
  {
    path: 'newsletter',
    canActivate: [AuthGuard],
    loadChildren: () => import('./newsletter/newsletter.module').then(m => m.NewsletterModule)
  },
  {
    path: 'posts-blog',
    canActivate: [AuthGuard],
    loadChildren: () => import('./posts-blog/posts-blog.module').then(m => m.PostsBlogModule)
  },
  {
    path: 'noticia',
    canActivate: [AuthGuard],
    loadChildren: () => import('./noticia/noticia.module').then(m => m.NoticiaModule)
  },
  {
    path: 'banner',
    canActivate: [AuthGuard],
    loadChildren: () => import('./banner/banner.module').then(m => m.BannerModule)
  },
  {
    path: 'careplus-perfil',
    canActivate: [AuthGuard],
    loadChildren: () => import('./careplus-perfil/careplus-perfil.module').then(m => m.CareplusPerfilModule)
  },
  {
    path: 'usuario',
    canActivate: [AuthGuard],
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: NeocmsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeocmsRoutingModule { }
