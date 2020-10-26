import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import { WindowRef } from 'src/utils/window-ref';
import { HeaderModule, FooterModule, HeaderMobileModule, NotificationModule, ModalModule, SimuladoresModule, CookieNoticeModule } from 'src/app/modules';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpRequestInterceptor } from './app.interceptor';
import { GestureConfig } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
registerLocaleData(localePt, 'pt', localePtExtra);

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        TransferHttpCacheModule,
        AppRoutingModule,
        HeaderModule,
        HeaderMobileModule,
        FooterModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NotificationModule,
        ModalModule,
        SimuladoresModule,
        CookieNoticeModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt' },
        WindowRef,
        { provide: APP_BASE_HREF, useValue: environment.BASE_HREF },
        { provide: 'locationObject', useValue: location },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true
        },
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: GestureConfig
        }

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
