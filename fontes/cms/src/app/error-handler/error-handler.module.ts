import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerComponent } from './error-handler.component';
import { ErrorHandlerService } from './error-handler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHandlerService } from '../http-handler/http-handler.service';
import { ErrorHandlerRoutingModule } from './error-handler-routing.module';

@NgModule({
  declarations: [ErrorHandlerComponent],
  imports: [
    CommonModule,
    ErrorHandlerRoutingModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ],
})
export class ErrorHandlerModule { }
