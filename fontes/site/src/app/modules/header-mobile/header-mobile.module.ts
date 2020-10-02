import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMobileComponent } from './header-mobile.component';
import { SharedModule } from '../shared/shared.module';
import { AngularResizedEventModule } from 'angular-resize-event';


@NgModule({
  declarations: [HeaderMobileComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularResizedEventModule
  ],
  exports: [HeaderMobileComponent],
})
export class HeaderMobileModule { }
