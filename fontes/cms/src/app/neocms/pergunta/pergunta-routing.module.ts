import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { PerguntaComponent } from './pergunta.component';
import { PerguntaCreateComponent } from './pergunta-create/pergunta-create.component';
import { PerguntaEditComponent } from './pergunta-edit/pergunta-edit.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: PerguntaComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: PerguntaCreateComponent
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        component: PerguntaEditComponent
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        component: PerguntaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PerguntaRoutingModule { }
