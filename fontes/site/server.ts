/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

import 'zone.js/dist/zone-node';

import * as compression from 'compression';
import * as express from 'express';
import { join } from 'path';
import https from 'https';

// Express server
const app = express();

// Compress all requests
app.use(compression())

const PORT = process.env.PORT || 4001;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

const domino = require('domino');
const fs = require('fs');
const template = fs.readFileSync(join(DIST_FOLDER, 'index.html')).toString();
const win = domino.createWindow(template);
global['window'] = win;
global['location'] = win.location;
global['Node'] = win.Node;
global['navigator'] = win.navigator;
global['navigator']['language'] = 'pt'
global['TextTrackCueList'] = null;
global['Event'] = win.Event;
global['KeyboardEvent'] = win.Event;
global['MouseEvent'] = win.Event;
global['Event']['prototype'] = win.Event.prototype;
global['document'] = win.document;
global['MutationObserver'] = getMockMutationObserver();


function getMockMutationObserver() {
    return class {
        observe(node, options) {
        }
        disconnect() {
        }
        takeRecords() {
            return [];
        }
    };
}

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap, env } = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Redirects

app.get('/planos-de-saude/care-plus-empresarial.aspx', (req, res) => {
    res.redirect(301,'/planos-e-produtos/careplus-empresarial');
});

app.get('/planos-de-saude/', (req, res) => {
    res.redirect(301,'/planos-e-produtos');
});

app.get('/planos-odontologicos/dental-prime-clinic.aspx', (req, res) => {
    res.redirect(301,'/planos-e-produtos');
});

app.get('/nossos-diferenciais/credenciado.aspx', (req, res) => {
    res.redirect(301,'/a-careplus/diferenciais');
});

app.get('/fale-conosco/contato.aspx', (req, res) => {
    res.redirect(301,'/fale-conosco/contato');
});

app.get('/nossos-diferenciais/beneficiario.aspx', (req, res) => {
    res.redirect(301,'/a-careplus/diferenciais');
});

app.get('/planos-odontologicos/nossos-produtos.aspx', (req, res) => {
    res.redirect(301,'/planos-e-produtos');
});

app.get('/planos-odontologicos/default.aspx', (req, res) => {
    res.redirect(301,'/planos-e-produtos');
});

app.get('/planos-odontologicos/nossos-diferenciais.aspx', (req, res) => {
    res.redirect(301,'/planos-e-produtos');
});

app.get('/planos-de-saude/soho.aspx"', (req, res) => {
    res.redirect(301,'/planos-e-produtos/careplus-soho');
});

app.get('/institucional.aspx', (req, res) => {
    res.redirect(301,'/a-careplus');
});

app.get('/ocupacional', (req, res) => {
    res.redirect(301,'/planos-e-produtos/medicina-ocupacional');
});

app.get('/biblioteca-da-saude/gestacao.aspx', (req, res) => {
    res.redirect(301,'/a-careplus');
});

app.get('/planos-de-saude/care-plus-200.aspx', (req, res) => {
    res.redirect(301,'/planos-e-produtos/clube-careplus');
});

app.get('/nossos-diferenciais/corretor.aspx', (req, res) => {
    res.redirect(301,'/a-careplus/diferenciais');
});

app.get('/mobile.aspx', (req, res) => {
    res.redirect(301,'/');
});

app.get('/missao-visao-valores.aspx', (req, res) => {
    res.redirect(301,'/a-careplus');
});

app.get('/nossos-diferenciais/gestor-rh.aspx', (req, res) => {
    res.redirect(301,'/a-careplus/diferenciais');
});

app.get('/planos-de-saude/reajuste-de-contratos.aspx', (req, res) => {
    res.redirect(301,'/planos-e-produtos');
});

app.get('/nossos-diferenciais.aspx', (req, res) => {
    res.redirect(301,'/a-careplus/diferenciais');
});

app.get('/planos-de-saude/dl/RN_389anexo.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/biblioteca-da-saude/alimentacao.aspx', (req, res) => {
    res.redirect(301,'/a-careplus');
});

app.get('/DL/Atendimento-Presencial-Care-Plus.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/resultados-financeiros.aspx', (req, res) => {
    res.redirect(301,'/a-careplus/resultados-financeiros');
});

app.get('/DL/H1N1_INFO_V02 - CI.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/coronavirus/files/guia-de-vigilancia-2020.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/biblioteca-da-saude/atividade-fisica.aspx', (req, res) => {
    res.redirect(301,'/a-careplus');
});

app.get('/fale-conosco/visita.aspx', (req, res) => {
    res.redirect(301,'/fale-conosco/contato');
});

app.get('/planos-de-saude/DL/Contratos-reajuste-coletivo_Pool-RN-309_052014-a-042015.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/politica-privacidade.aspx', (req, res) => {
    res.redirect(301,'/a-careplus/politica-de-privacidade');
});

app.get('/fale-conosco/imprensa.aspx', (req, res) => {
    res.redirect(301,'/fale-conosco/contato');
});

app.get('/pesquisa-satisfacao.aspx', (req, res) => {
    res.redirect(301,'/pesquisa-satisfacao');
});

app.get('/planos-de-saude/DL/RELACAO-DOS-CONTRATOS-COLETIVOS-DO-POOL-DE-RISCO-2019.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/coronavirus/files/BE6-Boletim-Especial-do-COE.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/planos-de-saude/DL/Contratos-reajuste-coletivo_Pool-RN-309_052013-a-042014.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/planos-de-saude/DL/RELACAO-DOS-CONTRATOS-COLETIVOS-DO-POOL-DE-RISCO-2018.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

// Enquanto não há blog irá para a home
app.get('/biblioteca-da-saude/doencas.aspx', (req, res) => {
    res.redirect(301,'/');
});

app.get('/planos-de-saude/DL/Reajuste-Pool-RN309-de-052015-a-042016_site.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/DL/Pesquisa_de_Satisfação_ANS_Care_Plus_IDSS_2020_Base_2019_v2.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/planos-de-saude/DL/RELACAO-DOS-CONTRATOS-COLETIVOS-DO-POOL-DE-RISCO-2017.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/DL/Cuco.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/biblioteca-da-saude/ferramentas.aspx', (req, res) => {
    res.redirect(301,'/a-careplus');
});

app.get('/DL/Pesquisa_de_Satisfação_ANS_Care_Plus-2020_(Base_2019).pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/d-b.aspx', (req, res) => {
    res.redirect(301,'/');
});

app.get('/planos-de-saude/DL/RELACAO-DOS-CONTRATOS-COLETIVOS-DO-POOL-DE-RISCO-2020.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/DL/FJB_20-CARE_PLUS-Parecer_de_Auditoria_170.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/DL/20160505-comunicado-interno.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/planos-de-saude/DL/RELACAO-DOS-CONTRATOS-COLETIVOS-DO-POOL-DE-RISCO-2016.pdf', (req, res) => {
    res.redirect(301,'/a-careplus/materiais');
});

app.get('/canaldenuncias', (req, res) => {
    res.redirect(301,'https://www8.careplus.com.br/portal/portal/modulos/home/canalDenuncias.aspx');
});

app.get('/comercial', (req, res) => {
    res.redirect(301,'http://www4.careplus.com.br/comercial');
});

app.get('/contrato', (req, res) => {
    res.redirect(301,'http://www4.careplus.com.br/contrato');
});

app.get('/funcionarios', (req, res) => {
    res.redirect(301,'http://www4.careplus.com.br/funcionarios');
});

app.get('/intcp', (req, res) => {
    res.redirect(301,'http://www8.careplus.com.br/portal/intcp/default.aspx');
});

app.get('/intranet/indicador', (req, res) => {
    res.redirect(301,'http://www4.careplus.com.br/intranet/indicador');
});

app.get('/mgm', (req, res) => {
    res.redirect(301,'http://www4.careplus.com.br/mgm');
});

app.get('/microsoft', (req, res) => {
    res.redirect(301,'http://www4.careplus.com.br/microsoft');
});

app.get('/opcionais-cp', (req, res) => {
    res.redirect(301,'http://www4.careplus.com.br/opcionais-cp');
});

app.get('/opcionais-p', (req, res) => {
    res.redirect(301,'http://www4.careplus.com.br/opcionais-p');
});

app.get('/pa', (req, res) => {
    res.redirect(301,'http://www8.careplus.com.br/relacionamento/');
});

app.get('/pd', (req, res) => {
    res.redirect(301,'http://www4.careplus.com.br/pd/md/');
});

app.get('/pd/md', (req, res) => {
    res.redirect(301,'http://www4.careplus.com.br/pd/md/');
});

app.get('/personalsystem', (req, res) => {
    res.redirect(301,'http://www9.personalsystem.med.br/personalsystem/index.aspx');
});

app.get('/personalsystem/personalsystem/psystem', (req, res) => {
    res.redirect(301,'http://www4.personalsystem.med.br/personalsystem/psystem/');
});

app.get('/relacionamento', (req, res) => {
    res.redirect(301,'http://www8.careplus.com.br/relacionamento');
});

app.get('/soho', (req, res) => {
    res.redirect(301,'http://www8.careplus.com.br/soho/');
});

app.get('/soho/corretor', (req, res) => {
    res.redirect(301,'http://www8.careplus.com.br/soho/');
});

app.get('/soho/admin', (req, res) => {
    res.redirect(301,'http://www8.careplus.com.br/soho/admin/login.aspx');
});

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
    maxAge: '1y'
}));

// All regular routes use the Universal engine

app.get('*', (req, res) => {
    res.render('index', { req });
});

// Start up the Node server
if (env.HAS_SSL_CERTIFIED) {
    const options: { [key: string]: string } = {
        key: fs.readFileSync(env.CERT_PATH.key),
        cert: fs.readFileSync(env.CERT_PATH.cert),
    }

    if (env.CERT_PATH.ca) {
        options.ca = fs.readFileSync(env.CERT_PATH.ca)
    }

    https.createServer(options, app).listen(443);
} else {
    app.listen(PORT, () => {
        console.log(`Node Express server listening on http://localhost:${PORT}`);
    });
}
