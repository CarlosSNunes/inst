import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { SafeHtml } from './pipes/safe-html';



@NgModule({
    declarations: [TableComponent, SafeHtml],
    imports: [
        CommonModule
    ],
    exports: [
        TableComponent
    ]
})
export class TableModule { }
