import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NeocmsHeaderComponent } from './neocms-header.component';

const routes: Routes = [
  {
    path: '',
    component: NeocmsHeaderComponent,
  },
  {
    path: '**',
    component: NeocmsHeaderComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeocmsHeaderRoutingModule { }
