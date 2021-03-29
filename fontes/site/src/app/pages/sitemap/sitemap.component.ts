import { Component, OnInit } from '@angular/core';
import { BreadcrumbModel } from 'src/app/models';

@Component({
    selector: 'app-sitemap',
    templateUrl: './sitemap.component.html',
    styleUrls: ['./sitemap.component.scss']
})
export class SitemapComponent implements OnInit {
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            name: 'Home',
            link: '/'
        }),
        new BreadcrumbModel({
            name: 'Sitemap',
            link: '/sitemap',
            active: true
        })
    ];
    constructor() { }

    ngOnInit() {
    }

}
