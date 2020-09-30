import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { LoginRoutingModule } from './login-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginAuthGuard } from './login-auth.service';
import { HttpHandlerService } from '../http-handler/http-handler.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    LoginAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class LoginModule { }
