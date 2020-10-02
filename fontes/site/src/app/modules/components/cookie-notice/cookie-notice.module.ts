import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieNoticeComponent } from './cookie-notice.component';



@NgModule({
  declarations: [CookieNoticeComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CookieNoticeComponent
  ]
})
export class CookieNoticeModule { }
