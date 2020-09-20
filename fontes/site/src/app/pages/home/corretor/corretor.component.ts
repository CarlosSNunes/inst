import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { BannerModel, InfoSectionModel, ButtonModel, IconCardsSectionModel, BreadcrumbModel } from 'src/app/models';
import { differentialsMock } from "./data/differentials";
import { bannersMock } from './data/banners';
import { WindowRef } from 'src/utils/window-ref';
import { ProductComponent } from 'src/app/modules/components/product/product.component';
import Cards from './data/cards';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-corretor',
    templateUrl: './corretor.component.html',
    styleUrls: ['./corretor.component.scss']
})
export class CorretorComponent implements OnInit {
    @ViewChild('sectionProduct', { static: false }) sectionProduct: ProductComponent
    differentials = differentialsMock;
    banners: Array<BannerModel> = bannersMock;
    travelSection: InfoSectionModel = new InfoSectionModel({
        smallTitle: 'CARE PLUS TRAVEL',
        bigTitle: 'Vai viajar ao exterior? Conte com o Care Plus Travel',
        description: 'O Care Plus Travel tem cobertura internacional de até US$ 300.000,00',
        subDescription: 'Desbrave o mundo sem preocupação. A Care Plus garante segurança e saúde para você e sua família curtirem a viagem com tranquilidade. Entre em contato com o gestor do seu plano para contratar esse benefício.',
        imageSrc: 'assets/img/plane.jpg'
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
            name: 'Sou Corretor',
            link: '/home/corretor',
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
        if (this.scrollTop > this.sectionProduct.offsetTop) {
            this.showBtnToTop = true;
        } else {
            this.showBtnToTop = false;
        }
    }

    slideToSection() {
        const elementOffset = parseInt(localStorage.getItem('elementOffset'));
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: (this.sectionProduct.offsetTop - elementOffset),
            behavior: "smooth"
        })
    }

    setSEOInfos() {
        this.title.setTitle('Corretor | Care Plus');
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
