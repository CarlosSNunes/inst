import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdssComponent } from './idss.component';
import { IdssRoutingModule } from './idss-routing.module';
import { DocumentsModule, LearnMoreModule, SharedModule, DropdownModule, TableModule, SimpleBannerModule } from 'src/app/modules';

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
