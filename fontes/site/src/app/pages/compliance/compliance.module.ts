import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplianceComponent } from './compliance.component';
import { ComplianceRoutingModule } from './compliance-routing.module';
import { LearnMoreModule, SharedModule, DocumentsModule, SimpleBannerModule } from 'src/app/modules';

@NgModule({
    declarations: [ComplianceComponent],
    imports: [
        CommonModule,
        ComplianceRoutingModule,
        LearnMoreModule,
        SharedModule,
        DocumentsModule,
        SimpleBannerModule
    ]
})
export class ComplianceModule { }
