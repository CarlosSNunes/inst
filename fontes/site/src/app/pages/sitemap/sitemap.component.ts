import { Component, OnInit } from '@angular/core';
import { BreadcrumbModel } from 'src/app/models';
import { SimuladoresService } from 'src/app/services';

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
    constructor(
        private simuladoresService: SimuladoresService
    ) { }

    ngOnInit() {
    }

    openSimulator() {
        this.simuladoresService.open();
    }
}
