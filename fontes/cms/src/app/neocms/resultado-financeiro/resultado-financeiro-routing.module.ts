import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultadoFinanceiroComponent } from './resultado-financeiro.component';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { ResultadoFinanceiroCreateComponent } from './resultado-financeiro-create/resultado-financeiro-create.component';
import { ResultadoFinanceiroEditComponent } from './resultado-financeiro-edit/resultado-financeiro-edit.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ResultadoFinanceiroComponent,
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: ResultadoFinanceiroCreateComponent
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: ResultadoFinanceiroEditComponent
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: ResultadoFinanceiroComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadoFinanceiroRoutingModule { }
