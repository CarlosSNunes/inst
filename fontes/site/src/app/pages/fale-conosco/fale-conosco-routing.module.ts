import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaleConoscoComponent } from './fale-conosco.component';

const routes: Routes = [
  {
    path: '',
    component: FaleConoscoComponent,
  },
  {
    path: ':id',
    component: FaleConoscoComponent
  },
  {
    path: ':id/obrigado',
    loadChildren: () => import('./obrigado/obrigado.module').then(m => m.ObrigadoModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaleConoscoRoutingModule { }
