// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    API_URL: 'http://ip-c6136b09.corp.amazonworkspaces.com:8081',
    SELF_URL: 'http://localhost:4300',
    CAREPLUS_URL: 'https://www8.careplus.com.br/portal/',
    BASE_HREF: '/',
    API_USER: 'admin@admin.com',
    API_PASSWORD: '123',
    HAS_SSL_CERTIFIED: false,
    CERT_PATH: {
        key: '',
        cert: '',
        ca: ''
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
