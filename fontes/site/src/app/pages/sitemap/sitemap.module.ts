import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitemapComponent } from './sitemap.component';
import { SitemapRoutingModule } from './sitemap-routing.module';
import { BreadcrumbModule } from 'src/app/modules';


@NgModule({
  declarations: [SitemapComponent],
  imports: [
    CommonModule,
    SitemapRoutingModule,
    BreadcrumbModule
  ]
})
export class SitemapModule { }
