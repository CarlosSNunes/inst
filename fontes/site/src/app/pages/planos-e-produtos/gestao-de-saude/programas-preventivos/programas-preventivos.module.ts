import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramasPreventivosComponent } from './programas-preventivos.component';
import { ProgramasPreventivosRoutingModule } from './programas-preventivos-routing.module';
import { IconCardsSectionModule, InfoSectionModule, SimpleBannerModule } from 'src/app/modules';


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
