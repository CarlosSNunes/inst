import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    // Rotas para das demais homes estão dentro do home-routing.mdule
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    },
    {
        path: 'a-careplus',
        loadChildren: () => import('./pages/a-careplus/a-careplus.module').then(m => m.ACareplusModule),
    },
    {
        path: 'fale-conosco',
        loadChildren: () => import('./pages/fale-conosco/fale-conosco.module').then(m => m.FaleConoscoModule)
    },
    {
        path: 'planos-e-produtos',
        loadChildren: () => import('./pages/planos-e-produtos/planos-e-produtos.module').then(m => m.PlanosEProdutosModule),
    },
    {
        path: 'carreiras',
        loadChildren: () => import('./pages/carreiras/carreiras.module').then(m => m.CarreirasModule),
    },
    {
        path: 'obrigado',
        loadChildren: () => import('./pages/obrigado/obrigado.module').then(m => m.ObrigadoModule),
    },
    {
        path: '**',
        loadChildren: () => import('./pages/erro/erro.module').then(m => m.ErroModule)
    }
];

const options: ExtraOptions = {
    anchorScrolling: "disabled",
    onSameUrlNavigation: "reload",
    scrollPositionRestoration: 'enabled',
};

@NgModule({
    imports: [RouterModule.forRoot(routes, options)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
