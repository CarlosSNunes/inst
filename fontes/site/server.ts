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
import spdy from 'spdy'

// Express server
const app = express();

// Compress all responses
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

    spdy.createServer(options, app).listen(443, (error) => {
        if (error) {
            console.error(error)
            return process.exit(1)
        } else {
            console.log('Listening on port: ' + 443 + '.')
        }
    });
} else {
    app.listen(PORT, () => {
        console.log(`Node Express server listening on http://localhost:${PORT}`);
    });
}
