import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { PerguntaTipoComponent } from './pergunta-tipo.component';
import { PerguntaTipoCreateComponent } from './pergunta-tipo-create/pergunta-tipo-create.component';
import { PerguntaTipoEditComponent } from './pergunta-tipo-edit/pergunta-tipo-edit.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: PerguntaTipoComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: PerguntaTipoCreateComponent
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        component: PerguntaTipoEditComponent
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        component: PerguntaTipoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PerguntaTipoRoutingModule { }
