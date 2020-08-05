import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { DocumentoComponent } from './documento.component';
import { DocumentoCreateComponent } from './documento-create/documento-create.component';
import { DocumentoEditComponent } from './documento-edit/documento-edit.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: DocumentoComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: DocumentoCreateComponent
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        component: DocumentoEditComponent
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        component: DocumentoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentoRoutingModule { }
