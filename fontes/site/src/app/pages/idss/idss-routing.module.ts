import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdssComponent } from './idss.component';

const routes: Routes = [
    {
        path: '',
        component: IdssComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IdssRoutingModule { }
