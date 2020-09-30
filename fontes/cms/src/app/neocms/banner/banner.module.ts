/**
 * * Copyright (c) 2020 - NEOTIX INTERNET AGENCY – LTDA.
 * * All rights reserved.
 * @ Author: Bruno Sábio
 * @ Create Time: 2020-09-20 16:54:14
 * @ Modified by: Your name
 * @ Modified time: 2020-09-28 04:29:45
 * @ Description:
 */
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
import { ImageCropperModule } from 'ngx-image-cropper';
import { SelectDropDownModule } from 'ngx-select-dropdown'

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};
@NgModule({
  declarations: [
    BannerComponent,
    BannerCreateComponent,
    BannerEditComponent,
    BannerDeleteComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BannerRoutingModule,
    NgWizardModule,
    ImageCropperModule,
    SelectDropDownModule,
    
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
