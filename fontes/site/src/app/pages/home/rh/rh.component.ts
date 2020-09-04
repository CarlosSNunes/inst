import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { BannerModel, InfoSectionModel, ButtonModel, IconCardsSectionModel, BreadcrumbModel } from 'src/app/models';
import { bannersMock } from './data/banners';
import { InfoSectionComponent } from 'src/app/modules/components/info-section/info-section.component';
import { WindowRef } from 'src/utils/window-ref';
import Cards from './data/cards';
import { Meta, Title } from '@angular/platform-browser';
import { SimuladoresService } from 'src/app/services';

@Component({
    selector: 'app-rh',
    templateUrl: './rh.component.html',
    styleUrls: ['./rh.component.scss']
})
export class RhComponent implements OnInit {
    @ViewChild('infoSection', { static: false }) infoSection: InfoSectionComponent;
    banners: Array<BannerModel> = bannersMock;
    ocupationalSection = new InfoSectionModel({
        smallTitle: 'MEDICINA OCUPACIONAL',
        bigTitle: 'Mais saúde e qualidade no ambiente de trabalho',
        description: 'A Care Plus tem o melhor serviço de Medicina Ocupacional para a sua empresa',
        subDescription: 'Conte com todo o suporte na realização de exames admissionais, demissionais, periódicos e muito mais.',
        imageSrc: 'assets/img/occupational.jpg',
        button: new ButtonModel({
            text: 'SAIBA MAIS',
            link: '/planos-e-produtos/medicina-ocupacional'
        })
    });
    simulationSection = new InfoSectionModel({
        smallTitle: 'SIMULADOR DE PLANOS',
        bigTitle: 'Descubra o plano certo para a sua empresa',
        description: 'Faça o nosso simulador de planos e encontre a solução ideal para o seu negócio',
        subDescription: 'Não perca tempo pesquisando e selecionando as opções compatíveis com a sua empresa. Siga o passo a passo do nosso simulador e receba uma proposta já adequada ao perfil da sua organização.',
        imageSrc: 'assets/img/simulators.jpg',
        button: new ButtonModel({
            text: 'SIMULAR PLANO',
            action: () => this.simularesService.open()
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
            name: 'Sou RH',
            link: '/home/rh',
            active: true
        }),
    ];
    scrollTop: number = 0;
    showBtnToTop: boolean = false;

    constructor(
        private windowRef: WindowRef,
        private meta: Meta,
        private title: Title,
        private simularesService: SimuladoresService
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
        this.scrollTop = event.currentTarget.pageYOffset;
        if (this.scrollTop > this.infoSection.offsetTop) {
            this.showBtnToTop = true;
        } else {
            this.showBtnToTop = false;
        }
    }

    slideToSection() {
        const elementOffset = parseInt(localStorage.getItem('elementOffset'));
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: (this.infoSection.offsetTop - elementOffset),
            behavior: "smooth"
        })
    }

    setSEOInfos() {
        this.title.setTitle('RH | Care Plus');
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
