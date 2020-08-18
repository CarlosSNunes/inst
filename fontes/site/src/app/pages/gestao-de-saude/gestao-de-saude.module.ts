import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestaoDeSaudeComponent } from './gestao-de-saude.component';
import { GestaoDeSaudeRoutingModule } from './gestao-de-saude-routing.module';
import { HeroBannerModule } from 'src/app/modules/components/hero-banner/hero-banner.module';
import { InfoSectionModule } from 'src/app/modules/components/info-section/info-section.module';
import { CommomQuestionsModule } from 'src/app/modules/components/commom-questions/commom-questions.module';
import { CareplusPlusModule } from 'src/app/modules/components/careplus-plus/careplus-plus.module';



@NgModule({
  declarations: [GestaoDeSaudeComponent],
  imports: [
    CommonModule,
    GestaoDeSaudeRoutingModule,
    HeroBannerModule,
    InfoSectionModule,
    CommomQuestionsModule,
    CareplusPlusModule
  ]
})
export class GestaoDeSaudeModule { }
