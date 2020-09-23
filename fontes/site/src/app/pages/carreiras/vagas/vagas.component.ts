import { Component, ElementRef, OnInit } from '@angular/core';
import { BreadcrumbModel, SimpleBannerModel, CrossContentModel, ButtonModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-vagas',
    templateUrl: './vagas.component.html',
    styleUrls: ['./vagas.component.scss']
})
export class VagasComponent implements OnInit {
    simpleBannerModel: SimpleBannerModel = {
        title: 'Saiba mais sobre os nossos programas e vagas em aberto',
        description: 'A Care Plus tem o objetivo de acompanhar você para a sua carreira e criar esse futuro junto com você',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/home',
            }),
            new BreadcrumbModel({
                name: 'Carreiras',
                link: '/carreiras',
            }),
            new BreadcrumbModel({
                name: 'Vagas',
                link: '/carreiras/vagas',
                active: true
            })
        ],
        hasAnchor: true,
        image: 'assets/img/section-a-careplus-jobs.jpg'
    };
    crossContentModel: CrossContentModel = new CrossContentModel({
        bigTitle: 'Mais do que trabalhar com líderes inspiradores, nós queremos que você seja um',
        firstImage: {
            src: 'assets/img/Carreira_Vagas_1.png',
            alt: 'Banco de dados imagem 1'
        },
        secondImage: {
            src: 'assets/img/Carreira_Vagas_2.png',
            alt: 'Banco de dados imagem 2'
        },
        boxContent: {
            title: 'Cadastre-se para integrar nosso banco de talentos',
            description: 'Estamos compondo um time repleto de talentos, envie para nós os seus dados pessoais e profissionais e entraremos em contato para futuras oportunidades.',
            button: new ButtonModel({
                text: 'Saiba mais',
                link: 'https://careplus.gupy.io/'
            })
        }
    });
    constructor(
        private windowRef: WindowRef,
        private meta: Meta,
        private title: Title,
        private elementRef: ElementRef<HTMLElement>
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    goToNextSection() {
        const crossCrontent = this.elementRef.nativeElement.querySelector('.cross-content-section') as HTMLElement;

        if (crossCrontent && crossCrontent != null) {
            this.windowRef.nativeWindow.scrollTo({
                left: 0,
                top: crossCrontent.offsetTop - parseInt(localStorage.getItem('elementOffset')),
                behavior: 'smooth'
            });
        }
    }

    setSEOInfos() {
        this.title.setTitle('Vagas | Carreiras | A Care Plus | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Saiba mais sobre os nossos programas e oportunidades de trabalho!'
        });
    }

}
