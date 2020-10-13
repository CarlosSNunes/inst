/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { NeocmsHeaderModule } from './neocms/neocms-header/neocms-header.module';
import { NeocmsFooterModule } from './neocms/neocms-footer/neocms-footer.module';
import { NeocmsMenuLateralModule } from './neocms/neocms-menu-lateral/neocms-menu-lateral.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { HttpHandlerService } from './http-handler/http-handler.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';


const ngWizardConfig: NgWizardConfig = {
  theme: THEME.circles,
};
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    NeocmsHeaderModule,
    NeocmsFooterModule,
    NeocmsMenuLateralModule,
    ErrorHandlerModule,
    HttpClientModule,
    NgWizardModule.forRoot(ngWizardConfig),
    
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    SelectDropDownModule,
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BrowserAnimationsModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
