import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeocmsFooterComponent } from './neocms-footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';

@NgModule({
  declarations: [NeocmsFooterComponent],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ],
  exports: [NeocmsFooterComponent]
})
export class NeocmsFooterModule { }
