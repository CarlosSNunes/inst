import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { bannersMock } from './data/banners';
import { BannerModel, CareplusVideoModel, IconCardsSectionModel, ButtonModel, BreadcrumbModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';
import { ACareplusVideoComponent } from 'src/app/modules/components/a-careplus-video/a-careplus-video.component';
import Cards from './data/cards';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-credenciado',
    templateUrl: './credenciado.component.html',
    styleUrls: ['./credenciado.component.scss']
})
export class CredenciadoComponent implements OnInit {
    banners: Array<BannerModel> = bannersMock;
    @ViewChild('videoCareplus', { static: false }) videoCareplus: ACareplusVideoComponent;
    videoModel: CareplusVideoModel = new CareplusVideoModel({
        smallTitle: 'A CARE PLUS',
        bigTitle: 'A maior operadora de saúde premium com 27 anos de mercado',
        embedSrc: 'https://www.youtube.com/embed/-f9weYoBxD8',
        button: new ButtonModel({
            text: 'CONHEÇA A CARE PLUS',
            title: 'CONHEÇA A CARE PLUS',
            routerLink: '/a-careplus'
        })
    });
    iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel({
        smallTitle: 'GESTÃO DE SAÚDE',
        bigTitle: 'Programas e serviços exclusivos: a melhor experiência em saúde',
        subDescription: 'Mais do que cuidado, a Care Plus proporciona facilidade e comodidade para todos os beneficiários e empresas.',
        button: new ButtonModel({
            text: 'CONHEÇA NOSSOS PROGRAMAS',
            routerLink: '/gestao-de-saude'
        }),
        cards: Cards,
        columnClass: 'is-3-desktop'
    });
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            name: 'Home',
            link: '/home'
        }),
        new BreadcrumbModel({
            name: 'Sou Credenciado',
            link: '/home/credenciado',
            active: true
        }),
    ];
    scrollTop: number = 0;
    showBtnToTop: boolean = false;
    
    constructor(
        private windowRef: WindowRef,
        private meta: Meta,
        private title: Title
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
        this.scrollTop = event.currentTarget.pageYOffset;
        if (this.scrollTop > this.videoCareplus.offsetTop) {
            this.showBtnToTop = true;
        } else {
            this.showBtnToTop = false;
        }
    }

    slideToSection() {
        const elementOffset = parseInt(localStorage.getItem('elementOffset'));
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: (this.videoCareplus.offsetTop - elementOffset),
            behavior: "smooth"
        })
    }

    setSEOInfos() {
        this.title.setTitle('Credenciado | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus é uma operadora que disponibiliza soluções de medicina, odontologia, saúde ocupacional e prevenção. Atendemos mais de 100 mil beneficiários.'
        });
    }

    goToTop() {
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: 0,
            behavior: "smooth"
        })
    }

}
