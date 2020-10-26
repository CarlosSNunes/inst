import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestaoDeSaudeComponent } from './gestao-de-saude.component';
import { GestaoDeSaudeRoutingModule } from './gestao-de-saude-routing.module';
import { HeroBannerModule, InfoSectionModule, CommomQuestionsModule } from 'src/app/modules';

@NgModule({
  declarations: [GestaoDeSaudeComponent],
  imports: [
    CommonModule,
    GestaoDeSaudeRoutingModule,
    HeroBannerModule,
    InfoSectionModule,
    CommomQuestionsModule,
  ]
})
export class GestaoDeSaudeModule { }
