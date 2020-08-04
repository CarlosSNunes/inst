import { Component, OnInit } from '@angular/core';
import { SimpleBannerModel, BreadcrumbModel } from 'src/app/models';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-consulta-facil',
    templateUrl: './consulta-facil.component.html',
    styleUrls: ['./consulta-facil.component.scss']
})
export class ConsultaFacilComponent implements OnInit {
    simpleBannerModel: SimpleBannerModel = {
        title: 'Consulta Fácil: atendimento rápido e sem horário marcado',
        description: 'O Consulta Fácil é mais uma facilidade da Care Plus para os beneficiários que precisam de atendimento clínico ou pediátrico.',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/home',
            }),
            new BreadcrumbModel({
                name: 'Carreiras',
                link: '/carreiras-careplus',
            }),
            new BreadcrumbModel({
                name: 'Consulta Fácil',
                link: `/carreiras-careplus/consulta-facil`,
                active: true
            })
        ],
        hasAnchor: true,
        image: 'assets/img/banner-consulta-facil.jpg'
    };
    constructor(
        private title: Title,
        private meta: Meta
    ) {

    }

    ngOnInit() {
    }

    setSEOInfos() {
        this.title.setTitle('Consulta Fácil | Carreiras | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: ''
        })
    }
}
