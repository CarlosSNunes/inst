import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { BannerService } from './banner.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BannerCreateComponent } from './banner-create/banner-create.component';
import { BannerEditComponent } from './banner-edit/banner-edit.component';
import { BannerDeleteComponent } from './banner-delete/banner-delete.component';
import { HttpHandlerService } from './../../../../src/app/http-handler/http-handler.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BannerRoutingModule } from './banner-edit/banner-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BannerOrderComponent } from './banner-order/banner-order.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.dots
};


@NgModule({
  declarations: [
    BannerComponent,
    BannerCreateComponent,
    BannerEditComponent,
    BannerDeleteComponent,
    BannerOrderComponent,
    
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BannerRoutingModule,
    NgWizardModule.forRoot(ngWizardConfig),
    ImageCropperModule,
    NgxPaginationModule,
    ModalModule,
    TabsModule.forRoot(),
    DragDropModule,
  ],
  providers: [
    BannerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
    
  ],
  exports:[
    DragDropModule
  ],
 
})
export class BannerModule { }
