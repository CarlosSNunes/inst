import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';



@NgModule({
    declarations: [
        BannerComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        BreadcrumbModule
    ],
    exports: [
        BannerComponent
    ]
})
export class BannerModule { }
