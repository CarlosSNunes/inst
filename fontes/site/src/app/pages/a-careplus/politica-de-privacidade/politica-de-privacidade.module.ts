import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliticaDePrivacidadeComponent } from './politica-de-privacidade.component';
import { PoliticaDePrivacidadeRoutingModule } from './politica-de-privacidade-routing.module';
import { LearnMoreModule, SidebarModule } from 'src/app/modules';



@NgModule({
  declarations: [PoliticaDePrivacidadeComponent],
  imports: [
    CommonModule,
    PoliticaDePrivacidadeRoutingModule,
    LearnMoreModule,
    SidebarModule
  ]
})
export class PoliticaDePrivacidadeModule { }
