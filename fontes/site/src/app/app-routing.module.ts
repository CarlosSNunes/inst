import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        redirectTo: '/',
        pathMatch: 'full'
    },
    // Rotas para das demais homes estão dentro do home-routing.mdule
    {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    },
    {
        path: 'home/beneficiario',
        loadChildren: () => import('src/app/pages/home/beneficiario/beneficiario.module').then(m => m.BeneficiarioModule),
    },
    {
        path: 'home/rh',
        loadChildren: () => import('src/app/pages/home/rh/rh.module').then(m => m.RhModule),
    },
    {
        path: 'home/corretor',
        loadChildren: () => import('src/app/pages/home/corretor/corretor.module').then(m => m.CorretorModule),
    },
    {
        path: 'home/credenciado',
        loadChildren: () => import('src/app/pages/home/credenciado/credenciado.module').then(m => m.CredenciadoModule),
    },
    {
        path: 'a-careplus',
        loadChildren: () => import('./pages/a-careplus/a-careplus.module').then(m => m.ACareplusModule),
    },
    {
        path: 'compliance',
        loadChildren: () => import('./pages/compliance/compliance.module').then(m => m.ComplianceModule),
    },
    {
        path: 'idss',
        loadChildren: () => import('./pages/idss/idss.module').then(m => m.IdssModule),
    },
    {
        path: 'pesquisa-satisfacao',
        loadChildren: () => import('./pages/pesquisa-satisfacao/pesquisa-satisfacao.module').then(m => m.PesquisaSatisfacaoModule),
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
