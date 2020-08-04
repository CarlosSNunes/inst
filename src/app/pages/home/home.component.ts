import {
    Component,
    OnInit,
    ChangeDetectorRef,
    ViewChild,
    HostListener,
    Inject,
    PLATFORM_ID
} from '@angular/core';
import { AppService } from 'src/app/services';
import { ProductComponent } from '../../modules/components/product/product.component';
import { bannersMock } from './data/banners'
import { isPlatformBrowser } from '@angular/common';
import { InfoSectionModel, ButtonModel, CareplusVideoModel, IconCardsSectionModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';
import Cards from './data/cards';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    banners = bannersMock;
    scrollTop = 0;
    @ViewChild('sectionProduct', { static: false }) sectionProduct: ProductComponent;
    showBtnToTop = false;
    isBrowser: boolean = false;
    ocupationalSection = new InfoSectionModel({
        smallTitle: 'MEDICINA OCUPACIONAL',
        bigTitle: 'Mais saúde e qualidade no ambiente de trabalho',
        description: 'A Care Plus tem o melhor serviço de medicina ocupacional para a sua empresa',
        subDescription: 'Conte com todo o suporte na realização de exames admissionais, demissionais, periódicos e muito mais.',
        imageSrc: 'assets/img/occupational.jpg',
        button: new ButtonModel({
            text: 'SAIBA MAIS',
            routerLink: '/produtos-e-planos-careplus/medicina-ocupacional'
        })
    })
    videoModel: CareplusVideoModel = new CareplusVideoModel({
        smallTitle: 'A CARE PLUS',
        bigTitle: 'A maior operadora de saúde premium com 27 anos de mercado',
        video: {
            link: 'http://static.videogular.com/assets/videos/videogular.mp4',
            type: 'video/mp4'
        },
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

    constructor(
        private appService: AppService,
        private cdRef: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private plataformId,
        private windowRef: WindowRef
    ) {
        this.isBrowser = isPlatformBrowser(plataformId);
    }

    ngOnInit() {
        this.appService.state = [];
        if (this.isBrowser) {
            this.cdRef.detectChanges();
        }
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

    goToTop() {
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: 0,
            behavior: "smooth"
        })
    }
}
