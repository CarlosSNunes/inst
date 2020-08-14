import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { bannersMock } from './data/banners';
import { BreadcrumbModel, CareplusVideoModel, ButtonModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-carreiras',
    templateUrl: './carreiras.component.html',
    styleUrls: ['./carreiras.component.scss']
})
export class CarreirasComponent implements OnInit {
    @ViewChild('sectionNossosPilares', { static: false }) sectionNossosPilares: ElementRef<HTMLElement>;
    banners = bannersMock;
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            name: 'Home',
            link: '/home'
        }),
        new BreadcrumbModel({
            name: 'Carreiras',
            link: '/carreiras',
            active: true
        })
    ];
    videoModel: CareplusVideoModel = new CareplusVideoModel({
        smallTitle: 'A CARE PLUS',
        bigTitle: 'Por que escolher a Care Plus?',
        embedSrc: 'https://www.youtube.com/embed/-f9weYoBxD8',
        button: new ButtonModel({
            text: 'Conheça a Care Plus',
            routerLink: '/a-careplus'
        })
    });
    constructor(
        private windowRef: WindowRef,
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    slideToSection() {
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: this.sectionNossosPilares.nativeElement.offsetTop - parseInt(localStorage.getItem('elementOffset')),
            behavior: 'smooth'
        });
    }

    setSEOInfos() {
        this.title.setTitle('Carreiras | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Atendimento, acolhimento e humanização que fazem toda a diferença na vida de quem contrata, usa e comercializa as soluções Care Plus.'
        });
    }

}
