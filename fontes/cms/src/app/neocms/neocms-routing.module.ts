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
  // {
  //   path: 'categorias',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule)
  // },
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
    path: 'careplus-diferencial',
    canActivate: [AuthGuard],
    loadChildren: () => import('./careplus-diferencial/careplus-diferencial.module').then(m => m.CareplusDiferencialModule),
  },
  {
    path: 'careplus-depoimento',
    canActivate: [AuthGuard],
    loadChildren: () => import('./careplus-depoimento/careplus-depoimento.module').then(m => m.CareplusDepoimentoModule),
  },
  {
    path: 'cliente',
    canActivate: [AuthGuard],
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
  },
  {
    path: 'resultado-financeiro',
    canActivate: [AuthGuard],
    loadChildren: () => import('./resultado-financeiro/resultado-financeiro.module').then(m => m.ResultadoFinanceiroModule)
  },
  {
    path: 'documento',
    canActivate: [AuthGuard],
    loadChildren: () => import('./documento/documento.module').then(m => m.DocumentoModule)
  },
  {
    path: 'documento-tipo',
    canActivate: [AuthGuard],
    loadChildren: () => import('./documento-tipo/documento-tipo.module').then(m => m.DocumentoTipoModule)
  },
  {
    path: 'careplus-perfil',
    canActivate: [AuthGuard],
    loadChildren: () => import('./careplus-perfil/careplus-perfil.module').then(m => m.CareplusPerfilModule)
  },
  {
    path: 'pergunta',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pergunta/pergunta.module').then(m => m.PerguntaModule)
  },
  {
    path: 'pergunta-tipo',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pergunta-tipo/pergunta-tipo.module').then(m => m.PerguntaTipoModule)
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
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
