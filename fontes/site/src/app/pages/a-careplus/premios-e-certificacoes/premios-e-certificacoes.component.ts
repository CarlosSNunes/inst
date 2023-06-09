import { Component, OnInit, ViewChild, ElementRef, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { BreadcrumbModel, PostCardModel, SimpleBannerModel, ContentModalModel } from 'src/app/models';
import { ModalService } from 'src/app/services';
import { WindowRef } from 'src/utils/window-ref';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import Cards from './data/cards';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-premios-e-certificacoes',
    templateUrl: './premios-e-certificacoes.component.html',
    styleUrls: ['./premios-e-certificacoes.component.scss']
})
export class PremiosECertificacoesComponent implements OnInit {
    simpleBannerModel: SimpleBannerModel = {
        title: 'Uma história de sucesso e reconhecimento',
        description: 'Veja todos os nossos prêmios e certificações que reafirmam o nosso compromisso com a dedicação.',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/',
            }),
            new BreadcrumbModel({
                name: 'A Care Plus',
                link: '/a-careplus',
            }),
            new BreadcrumbModel({
                name: 'Premios e Certificações',
                link: '/a-careplus/premios-e-certificacoes',
                active: true
            })
        ],
        hasAnchor: true,
        image: 'assets/img/banner-premios-e-certificacoes.jpg'
    };
    @ViewChild('premiosECertificacoes', { static: false }) premiosECertificacoes: ElementRef<HTMLElement>;
    isBrowser: boolean = false;
    width: number = 0;
    offset: number = 0;
    cards: PostCardModel[] = Cards;
    constructor(
        private windowRef: WindowRef,
        @Inject(PLATFORM_ID) platformId: Platform,
        private title: Title,
        private meta: Meta,
        private modalService: ModalService
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
            if (this.width < 1024) {
                this.offset = 72;
            } else {
                this.offset = 0
            }
        }
        this.setSEOinfos();
    }

    ngOnInit() {
    }

    @HostListener('window: resize', ['$event']) onResize(event) {
        if (this.isBrowser) {
            this.width = event.target.innerWidth;
            if (this.width < 1024) {
                this.offset = 72;
            } else {
                this.offset = 0
            }
        }
    }

    goToNextSection() {
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: (this.premiosECertificacoes.nativeElement.offsetTop - this.offset),
            behavior: 'smooth'
        })
    }

    setSEOinfos() {
        this.title.setTitle('Prêmios e Certificados | A Care Plus | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Veja todos os nossos prêmios e certificações que reafirmam o nosso compromisso com a dedicação.'
        })
    }

    openModal(modalContent: any) {
        if (modalContent) {
            this.modalService.openModal(modalContent)
        }
    }

}
