import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorHandlerComponent } from './error-handler.component';

const routes: Routes = [
    {
        path: '',
        component: ErrorHandlerComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorHandlerRoutingModule { }
