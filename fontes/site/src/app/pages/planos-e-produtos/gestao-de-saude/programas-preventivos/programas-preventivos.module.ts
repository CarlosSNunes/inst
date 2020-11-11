import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramasPreventivosComponent } from './programas-preventivos.component';
import { ProgramasPreventivosRoutingModule } from './programas-preventivos-routing.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';
import { InfoSectionModule } from 'src/app/modules/components/info-section/info-section.module';
import { IconCardsSectionModule } from 'src/app/modules/components/icon-cards-section/icon-cards-section.module';



@NgModule({
  declarations: [ProgramasPreventivosComponent],
  imports: [
    CommonModule,
    ProgramasPreventivosRoutingModule,
    SimpleBannerModule,
    InfoSectionModule,
    IconCardsSectionModule,
    
  ]
})
export class ProgramasPreventivosModule { }