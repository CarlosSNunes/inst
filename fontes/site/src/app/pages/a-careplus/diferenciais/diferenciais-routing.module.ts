import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiferenciaisComponent } from './diferenciais.component';

const routes: Routes = [
    {
        path: '',
        component: DiferenciaisComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiferenciaisRoutingModule { }
