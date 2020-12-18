import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsabilidadeSocialComponent } from './responsabilidade-social.component';
import { ResponsabilidadeSocialRoutingModule } from './responsabilidade-social-routing.module';
import { BreadcrumbModule, ACareplusVideoModule, InfoSectionModule, LearnMoreModule, SimpleBannerModule, CareplusPlusModule } from 'src/app/modules';

@NgModule({
    declarations: [ResponsabilidadeSocialComponent],
    imports: [
        CommonModule,
        ResponsabilidadeSocialRoutingModule,
        BreadcrumbModule,
        ACareplusVideoModule,
        InfoSectionModule,
        LearnMoreModule,
        SimpleBannerModule,
        CareplusPlusModule
    ]
})
export class ResponsabilidadeSocialModule { }
