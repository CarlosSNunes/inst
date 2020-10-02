import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbModel } from 'src/app/models';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
    @Input() breadcrumbs: BreadcrumbModel[] = [];
    constructor() { }

    ngOnInit() {
    }

}
