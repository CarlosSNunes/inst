import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalSystemComponent } from './personal-system.component';

const routes: Routes = [
    {
        path: '',
        component: PersonalSystemComponent,
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonalSystemRoutingModule { }
