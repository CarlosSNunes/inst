import { Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbModel, SimpleBannerModel, CrossContentModel, ButtonModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';
import { OurProgramsComponent } from './our-programs/our-programs.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-vagas',
    templateUrl: './vagas.component.html',
    styleUrls: ['./vagas.component.scss']
})
export class VagasComponent implements OnInit {
    @ViewChild('ourPrograms', { static: false }) ourPrograms: OurProgramsComponent;
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
        bigTitle: 'Mais do que trabalhar com líderes inspiradores, nós queremos que você seja um.',
        firstImage: {
            src: 'assets/img/subscribe-in-vacancy-first-image.jpg',
            alt: 'Banco de dados imagem 1'
        },
        secondImage: {
            src: 'assets/img/subscribe-in-vacancy-second-image.jpg',
            alt: 'Banco de dados imagem 2'
        },
        boxContent: {
            title: 'Cadastre-se para integrar nosso banco de talentos',
            description: 'Estamos compondo um time repleto de talentos, envie para nós os seus dados pessoais e profissionais e entraremos em contato para futuras oportunidades.',
            button: new ButtonModel({
                text: 'saiba mais',
                routerLink: '/a-careplus/carreiras/vagas/banco-de-talentos'
            })
        }
    });
    constructor(
        private windowRef: WindowRef,
        private meta: Meta,
        private title: Title
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    goToNextSection() {
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: this.ourPrograms.offsetTop - parseInt(localStorage.getItem('elementOffset')),
            behavior: 'smooth'
        })
    }

    setSEOInfos() {
        this.title.setTitle('Vagas | Carreiras | A Care Plus | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Saiba mais sobre os nossos programas e oportunidades de trabalho!'
        });
    }

}
