import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdssComponent } from './idss.component';
import { IdssRoutingModule } from './idss-routing.module';
import { DocumentsModule } from 'src/app/modules/components/documents/documents.module';
import { LearnMoreModule } from 'src/app/modules/components/learn-more/learn-more.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { DropdownModule } from 'src/app/modules/components/dropdown/dropdown.module';
import { TableModule } from 'src/app/modules/components/table/table.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';


@NgModule({
    declarations: [IdssComponent],
    imports: [
        CommonModule,
        IdssRoutingModule,
        DocumentsModule,
        LearnMoreModule,
        SharedModule,
        DropdownModule,
        TableModule,
        SimpleBannerModule
    ]
})
export class IdssModule { }
