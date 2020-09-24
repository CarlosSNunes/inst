

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
import { BannerRoutingModule } from './banner-routing.module';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { PaginationModule } from 'ngx-bootstrap/pagination';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};
@NgModule({
  declarations: [
    BannerComponent,
    BannerCreateComponent,
    BannerEditComponent,
    BannerDeleteComponent,
    ImageCropperComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BannerRoutingModule,
    NgWizardModule,
    PaginationModule
  ],
  providers: [
    BannerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerService,
      multi: true,
    }
  ]
})
export class BannerModule { }
