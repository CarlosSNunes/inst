
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { PostsBlogModule } from './neocms/posts-blog/posts-blog.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PostsBlogDeleteComponent } from './neocms/posts-blog/posts-blog-delete/posts-blog-delete.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


const ngWizardConfig: NgWizardConfig = {
  theme: THEME.circles,
};
@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents:[
    PostsBlogDeleteComponent
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
    
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BrowserAnimationsModule,
    PostsBlogModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  providers: [
    BsModalRef,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
