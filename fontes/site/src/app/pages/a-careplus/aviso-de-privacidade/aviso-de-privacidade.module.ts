import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvisoDePrivacidadeComponent } from './aviso-de-privacidade.component';
import { AvisoDePrivacidadeRoutingModule } from './aviso-de-privacidade-routing.module';
import { LearnMoreModule, SidebarModule } from 'src/app/modules';



@NgModule({
  declarations: [AvisoDePrivacidadeComponent],
  imports: [
    CommonModule,
    AvisoDePrivacidadeRoutingModule,
    LearnMoreModule,
    SidebarModule
  ]
})
export class AvisoDePrivacidadeModule { }
