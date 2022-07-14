import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { RedirectGuardService } from './services/redirect-guard/redirect-guard.service';

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
        path: 'sou-beneficiario',
        loadChildren: () => import('src/app/pages/beneficiario/beneficiario.module').then(m => m.BeneficiarioModule),
    },
    {
        path: 'sou-rh',
        loadChildren: () => import('src/app/pages/rh/rh.module').then(m => m.RhModule),
    },
    {
        path: 'sou-corretor',
        loadChildren: () => import('src/app/pages/corretor/corretor.module').then(m => m.CorretorModule),
    },
    {
        path: 'sou-credenciado',
        loadChildren: () => import('src/app/pages/credenciado/credenciado.module').then(m => m.CredenciadoModule),
    },
    {
        path: 'a-careplus',
        loadChildren: () => import('./pages/a-careplus/a-careplus.module').then(m => m.ACareplusModule),
    },
    {
        path: 'careplus-mais',
        loadChildren: () => import('./pages/careplus-mais/careplus-mais.module').then(m => m.CareplusMaisModule),
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
        path: 'sitemap',
        loadChildren: () => import('./pages/sitemap/sitemap.module').then(m => m.SitemapModule),
    },
    {
        path: '404',
        loadChildren: () => import('./pages/erro/erro.module').then(m => m.ErroModule)
    },

    // Redirects
    {
        path: 'fale-conosco_contact/solicite-uma-cotacao',
        redirectTo: '/fale-conosco/solicite-uma-cotacao'
    },
    {
        path: 'fale-conosco_contact/contato',
        redirectTo: '/fale-conosco/contato'
    },
    {
        path: 'fale-conosco_contact/canal-de-denuncias',
        redirectTo: '/fale-conosco/canal-de-denuncias'
    },
    {
        path: 'fale-conosco_contact',
        redirectTo: '/fale-conosco'
    },
    {
        path: 'carreiras_careers/vagas',
        redirectTo: '/carreiras/vagas'
    },
    {
        path: 'carreiras_careers',
        redirectTo: '/carreiras'
    },
    {
        path: 'a-careplus_privacy/politica-de-privacidade',
        redirectTo: '/a-careplus/politica-de-privacidade'
    },
    { path: 'planos-de-saude/care-plus-empresarial.aspx', redirectTo: '/planos-e-produtos/careplus-empresarial' },
    { path: 'planos-de-saude/', redirectTo: '/planos-e-produtos' },
    { path: 'planos-odontologicos/dental-prime-clinic.aspx', redirectTo: '/planos-e-produtos' },
    { path: 'nossos-diferenciais/credenciado.aspx', redirectTo: '/a-careplus/diferenciais' },
    { path: 'fale-conosco/contato.aspx', redirectTo: '/fale-conosco/contato' },
    { path: 'nossos-diferenciais/beneficiario.aspx', redirectTo: '/a-careplus/diferenciais' },
    { path: 'planos-odontologicos/nossos-produtos.aspx', redirectTo: '/planos-e-produtos' },
    { path: 'planos-odontologicos/default.aspx', redirectTo: '/planos-e-produtos' },
    { path: 'planos-odontologicos/nossos-diferenciais.aspx', redirectTo: '/planos-e-produtos' },
    { path: 'planos-de-saude/soho.aspx"', redirectTo: '/planos-e-produtos/careplus-soho' },
    { path: 'institucional.aspx', redirectTo: '/a-careplus' },
    // { path: 'ocupacional', redirectTo: '/planos-e-produtos/medicina-ocupacional' },
    { path: 'biblioteca-da-saude/gestacao.aspx', redirectTo: '/a-careplus' },
    { path: 'planos-de-saude/care-plus-200.aspx', redirectTo: '/planos-e-produtos/clube-careplus' },
    { path: 'nossos-diferenciais/corretor.aspx', redirectTo: '/a-careplus/diferenciais' },
    { path: 'mobile.aspx', redirectTo: '/' },
    { path: 'missao-visao-valores.aspx', redirectTo: '/a-careplus' },
    { path: 'nossos-diferenciais/gestor-rh.aspx', redirectTo: '/a-careplus/diferenciais' },
    { path: 'planos-de-saude/reajuste-de-contratos.aspx', redirectTo: '/planos-e-produtos' },
    { path: 'nossos-diferenciais.aspx', redirectTo: '/a-careplus/diferenciais' },
    { path: 'planos-de-saude/dl/RN_389anexo.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'biblioteca-da-saude/alimentacao.aspx', redirectTo: '/a-careplus' },
    { path: 'DL/Atendimento-Presencial-Care-Plus.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'resultados-financeiros.aspx', redirectTo: '/a-careplus/resultados-financeiros' },
    { path: 'DL/H1N1_INFO_V02 - CI.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'coronavirus/files/guia-de-vigilancia-2020.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'biblioteca-da-saude/atividade-fisica.aspx', redirectTo: '/a-careplus' },
    { path: 'fale-conosco/visita.aspx', redirectTo: '/fale-conosco/contato' },
    { path: 'planos-de-saude/DL/Contratos-reajuste-coletivo_Pool-RN-309_052014-a-042015.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'politica-privacidade.aspx', redirectTo: '/a-careplus/politica-de-privacidade' },
    { path: 'fale-conosco/imprensa.aspx', redirectTo: '/fale-conosco/contato' },
    { path: 'pesquisa-satisfacao.aspx', redirectTo: '/pesquisa-satisfacao' },
    { path: 'planos-de-saude/DL/RELACAO-DOS-CONTRATOS-COLETIVOS-DO-POOL-DE-RISCO-2019.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'coronavirus/files/BE6-Boletim-Especial-do-COE.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'planos-de-saude/DL/Contratos-reajuste-coletivo_Pool-RN-309_052013-a-042014.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'planos-de-saude/DL/RELACAO-DOS-CONTRATOS-COLETIVOS-DO-POOL-DE-RISCO-2018.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'biblioteca-da-saude/doencas.aspx', redirectTo: '/careplus-mais' },
    { path: 'planos-de-saude/DL/Reajuste-Pool-RN309-de-052015-a-042016_site.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'DL/Pesquisa_de_Satisfação_ANS_Care_Plus_IDSS_2020_Base_2019_v2.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'planos-de-saude/DL/RELACAO-DOS-CONTRATOS-COLETIVOS-DO-POOL-DE-RISCO-2017.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'DL/Cuco.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'biblioteca-da-saude/ferramentas.aspx', redirectTo: '/a-careplus' },
    { path: 'DL/Pesquisa_de_Satisfação_ANS_Care_Plus-2020_(Base_2019).pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'd-b.aspx', redirectTo: '/' },
    { path: 'planos-de-saude/DL/RELACAO-DOS-CONTRATOS-COLETIVOS-DO-POOL-DE-RISCO-2020.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'DL/FJB_20-CARE_PLUS-Parecer_de_Auditoria_170.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'DL/20160505-comunicado-interno.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'planos-de-saude/DL/RELACAO-DOS-CONTRATOS-COLETIVOS-DO-POOL-DE-RISCO-2016.pdf', redirectTo: '/a-careplus/materiais-de-saude' },
    { path: 'welcome-back', redirectTo: '/planos-e-produtos/medicina-ocupacional' },
    {
        path: 'canaldenuncias',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'https://www8.careplus.com.br/portal/portal/modulos/home/canalDenuncias.aspx'
        }
    },
    {
        path: 'comercial',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www4.careplus.com.br/comercial'
        }
    },
    {
        path: 'contrato',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www4.careplus.com.br/contrato'
        }
    },
    {
        path: 'funcionarios',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www4.careplus.com.br/funcionarios'
        }
    },
    {
        path: 'intcp',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www8.careplus.com.br/portal/intcp/default.aspx'
        }
    },
    {
        path: 'intranet/indicador',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www4.careplus.com.br/intranet/indicador'
        }
    },
    {
        path: 'mgm',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www4.careplus.com.br/mgm'
        }
    },
    {
        path: 'microsoft',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www4.careplus.com.br/microsoft'
        }
    },
    {
        path: 'opcionais-cp',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www4.careplus.com.br/opcionais-cp'
        }
    },
    {
        path: 'opcionais-p',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www4.careplus.com.br/opcionais-p'
        }
    },
    {
        path: 'pa',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www8.careplus.com.br/relacionamento/'
        }
    },
    {
        path: 'pd',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www4.careplus.com.br/pd/md/'
        }
    },
    {
        path: 'pd/md',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www4.careplus.com.br/pd/md/'
        }
    },
    {
        path: 'personalsystem',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www9.personalsystem.med.br/personalsystem/index.aspx'
        }
    },
    {
        path: 'personalsystem/personalsystem/psystem',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www4.personalsystem.med.br/personalsystem/psystem/'
        }
    },
    {
        path: 'relacionamento',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www8.careplus.com.br/relacionamento'
        }
    },
    {
        path: 'soho',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www8.careplus.com.br/soho/'
        }
    },
    {
        path: 'soho/corretor',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www8.careplus.com.br/soho/'
        }
    },
    {
        path: 'soho/admin',
        canActivate: [RedirectGuardService],
        component: RedirectGuardService,
        data: {
            externalUrl: 'http://www8.careplus.com.br/soho/admin/login.aspx'
        }
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];

const options: ExtraOptions = {
    anchorScrolling: "disabled",
    onSameUrlNavigation: "reload",
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabled'
};

@NgModule({
    imports: [RouterModule.forRoot(routes, options)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
