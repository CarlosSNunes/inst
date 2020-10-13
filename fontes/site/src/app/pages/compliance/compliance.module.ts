import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplianceComponent } from './compliance.component';
import { ComplianceRoutingModule } from './compliance-routing.module';
import { LearnMoreModule } from 'src/app/modules/components/learn-more/learn-more.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { DocumentsModule } from 'src/app/modules/components/documents/documents.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';

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
