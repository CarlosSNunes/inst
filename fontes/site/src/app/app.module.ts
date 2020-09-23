import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { registerLocaleData } from '@angular/common';
import { WindowRef } from 'src/utils/window-ref';
import { HeaderModule } from 'src/app/modules/header/header.module';
import { FooterModule } from 'src/app/modules/footer/footer.module';
import { HeaderMobileModule } from './modules/header-mobile/header-mobile.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpRequestInterceptor } from './app.interceptor';
import { NotificationModule } from './modules/components/notification/notification.module';
import { GestureConfig } from '@angular/material';
import { ModalModule } from './modules/components/modal/modal.module';
import { SimuladoresModule } from './modules/components/simuladores/simuladores.module';
import { CookieNoticeModule } from './modules/components/cookie-notice/cookie-notice.module';
registerLocaleData(localePt, 'pt', localePtExtra);

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        HeaderModule,
        HeaderMobileModule,
        FooterModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NotificationModule,
        ModalModule,
        SimuladoresModule,
        CookieNoticeModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt' },
        WindowRef,
        { provide: 'locationObject', useValue: location},
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
