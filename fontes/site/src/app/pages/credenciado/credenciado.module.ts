import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredenciadoComponent } from './credenciado.component';
import { CredenciadoRoutingModule } from './credenciado-routing.module';
import { BannerModule, ACareplusVideoModule, DifferentialModule, ContactScheduleAVisitModule, IconCardsSectionModule, MaterialsModule, SocialPostsModule, CareplusPlusModule } from 'src/app/modules';

@NgModule({
    declarations: [CredenciadoComponent],
    imports: [
        CommonModule,
        CredenciadoRoutingModule,
        BannerModule,
        ACareplusVideoModule,
        DifferentialModule,
        IconCardsSectionModule,
        ContactScheduleAVisitModule,
        MaterialsModule,
        SocialPostsModule,
        CareplusPlusModule
    ]
})
export class CredenciadoModule { }
