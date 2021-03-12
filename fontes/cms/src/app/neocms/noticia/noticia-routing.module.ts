import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoticiaCreateComponent } from './noticia-create/noticia-create.component';
import { NoticiaIndexComponent } from './noticia-index/noticia-index.component';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { NoticiaComponent } from './noticia.component';
import { NoticiaEditComponent } from './noticia-edit/noticia-edit.component';

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
    component: NoticiaIndexComponent
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: NoticiaCreateComponent
  },
  {
    path: 'tag',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tag/tag.module').then(m => m.TagModule)
  },
  {
    path: 'tipo',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tipo/tipo.module').then(m => m.TipoModule)
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: NoticiaEditComponent
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: NoticiaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiaRoutingModule { }
