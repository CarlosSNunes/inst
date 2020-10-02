import { Component, OnInit, Input } from '@angular/core';
import { TableModel } from 'src/app/models';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    @Input() table: TableModel = new TableModel();
    constructor() { }

    ngOnInit() {
    }

}
