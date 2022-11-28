import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliticaDeCookiesComponent } from './politica-de-cookies.component';
import { PoliticaDeCookiesRoutingModule } from './politica-de-cookies-routing.module';
import { LearnMoreModule, SidebarModule } from 'src/app/modules';



@NgModule({
  declarations: [PoliticaDeCookiesComponent],
  imports: [
    CommonModule,
    PoliticaDeCookiesRoutingModule,
    LearnMoreModule,
    SidebarModule
  ]
})
export class PoliticaDeCookiesModule { }
