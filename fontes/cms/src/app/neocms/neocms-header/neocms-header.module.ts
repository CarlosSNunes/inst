import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeocmsHeaderComponent } from './neocms-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NeocmsHeaderRoutingModule } from './neocms-header-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';

@NgModule({
  declarations: [NeocmsHeaderComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NeocmsHeaderRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ],
  exports: [NeocmsHeaderComponent]
})
export class NeocmsHeaderModule { }
