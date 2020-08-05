import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.service';
import { DocumentoTipoComponent } from './documento-tipo.component';
import { DocumentoTipoCreateComponent } from './documento-tipo-create/documento-tipo-create.component';
import { DocumentoTipoEditComponent } from './documento-tipo-edit/documento-tipo-edit.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: DocumentoTipoComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: DocumentoTipoCreateComponent
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        component: DocumentoTipoEditComponent
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        component: DocumentoTipoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentoTipoRoutingModule { }
