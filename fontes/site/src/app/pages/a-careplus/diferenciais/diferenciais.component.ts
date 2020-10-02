import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { bannersMock } from './data/banners';
import { BreadcrumbModel, CareplusVideoModel, ButtonModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-diferenciais',
    templateUrl: './diferenciais.component.html',
    styleUrls: ['./diferenciais.component.scss']
})
export class DiferenciaisComponent implements OnInit {
    @ViewChild('sectionNossosPilares', { static: false }) sectionNossosPilares: ElementRef<HTMLElement>;
    banners = bannersMock;
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            name: 'Home',
            link: '/home'
        }),
        new BreadcrumbModel({
            name: 'A Care Plus',
            link: '/a-careplus'
        }),
        new BreadcrumbModel({
            name: 'Diferenciais',
            link: '/a-careplus/diferenciais',
            active: true
        })
    ];
    videoModel: CareplusVideoModel = new CareplusVideoModel({
        smallTitle: 'A CARE PLUS',
        bigTitle: 'Por que escolher a Care Plus?',
        embedSrc: 'https://www.youtube.com/embed/VkJDsgCRrTk',
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
        this.title.setTitle('Diferenciais | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus sabe que atendimento, acolhimento e humanização fazem toda a diferença na vida de quem contrata, usa e comercializa os nossos planos e produtos de saúde.'
        });
    }

}
