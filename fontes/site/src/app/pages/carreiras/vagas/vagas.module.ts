import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VagasComponent } from './vagas.component';
import { VagasRoutingModule } from './vagas-routing.module';
import { SimpleBannerModule, LearnMoreModule, SliderModule, SharedModule, DropdownModule, BreadcrumbModule, CrossContentSectionModule } from 'src/app/modules';

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
