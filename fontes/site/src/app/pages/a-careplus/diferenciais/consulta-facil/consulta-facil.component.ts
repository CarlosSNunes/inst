import { Component, OnInit, ElementRef } from '@angular/core';
import { SimpleBannerModel, BreadcrumbModel } from 'src/app/models';
import { Title, Meta } from '@angular/platform-browser';
import { WindowRef } from 'src/utils/window-ref';

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
                name: 'A Care Plus',
                link: '/a-careplus',
            }),
            new BreadcrumbModel({
                name: 'Diferenciais',
                link: '/a-careplus/diferenciais',
            }),
            new BreadcrumbModel({
                name: 'Consulta Fácil',
                link: `/a-careplus/diferenciais/consulta-facil`,
                active: true
            })
        ],
        hasAnchor: true,
        image: 'assets/img/banner-consulta-facil.jpg'
    };
    constructor(
        private title: Title,
        private meta: Meta,
        private windowRef: WindowRef,
        private elementRef: ElementRef<HTMLElement>
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
    }


    goToSection(anchor: string) {
        const element = this.elementRef.nativeElement.querySelector(anchor) as HTMLElement;
        if (element) {
            this.windowRef.nativeWindow.scrollTo({
                left: 0,
                top: element.offsetTop - parseInt(localStorage.getItem('elementOffset')),
                behavior: 'smooth'
            });
        }
    }

    setSEOInfos() {
        this.title.setTitle('Consulta Fácil | Diferenciais | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Consulta Fácil é mais uma facilidade da Care Plus para os beneficiários que precisam de atendimento clínico ou pediátrico.'
        })
    }
}
