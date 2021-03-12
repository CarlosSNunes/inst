import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeocmsMenuLateralComponent } from './neocms-menu-lateral.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NeocmsMenuLateralRoutingModule } from './neocms-menu-lateral-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';

@NgModule({
  declarations: [NeocmsMenuLateralComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NeocmsMenuLateralRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ],
  exports: [
    NeocmsMenuLateralComponent
  ]
})
export class NeocmsMenuLateralModule { }
