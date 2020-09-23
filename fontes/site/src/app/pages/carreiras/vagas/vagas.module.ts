import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VagasComponent } from './vagas.component';
import { VagasRoutingModule } from './vagas-routing.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';
import { LearnMoreModule } from 'src/app/modules/components/learn-more/learn-more.module';
import { SliderModule } from 'src/app/modules/components/slider/slider.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { DropdownModule } from 'src/app/modules/components/dropdown/dropdown.module';
import { BreadcrumbModule } from 'src/app/modules/components/breadcrumb/breadcrumb.module';
import { CrossContentSectionModule } from 'src/app/modules/components/cross-content-section/cross-content-section.module';



@NgModule({
  declarations: [VagasComponent],
  imports: [
    CommonModule,
    VagasRoutingModule,
    SimpleBannerModule,
    LearnMoreModule,
    SliderModule,
    SharedModule,
    DropdownModule,
    BreadcrumbModule,
    CrossContentSectionModule
  ]
})
export class VagasModule { }
