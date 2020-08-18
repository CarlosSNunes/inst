import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleBannerComponent } from './simple-banner.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';



@NgModule({
    declarations: [SimpleBannerComponent],
    imports: [
        CommonModule,
        BreadcrumbModule
    ],
    exports: [
        SimpleBannerComponent
    ]
})
export class SimpleBannerModule { }
