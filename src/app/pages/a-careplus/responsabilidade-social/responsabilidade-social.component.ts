import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { BreadcrumbModel, CareplusVideoModel, InfoSectionModel, SimpleBannerModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';
import { isPlatformBrowser } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-responsabilidade-social',
    templateUrl: './responsabilidade-social.component.html',
    styleUrls: ['./responsabilidade-social.component.scss']
})
export class ResponsabilidadeSocialComponent implements OnInit {
    @ViewChild('iniciativaSection', { static: false }) iniciativaSection: ElementRef<HTMLElement>;
    simpleBannerModel: SimpleBannerModel = {
        title: 'Conheça os nosso projetos sociais e ações sustentáveis',
        description: 'Aqui você pode ver nossas ações para um mundo melhor.',
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
                name: 'Responsabilidade Social',
                link: '/a-careplus/responsabilidade-social',
                active: true
            })
        ],
        hasAnchor: true,
        image: 'assets/img/responsabilidade-social-banner.jpg'
    };
    isBrowser: boolean = false;
    width: number = 0;
    offset: number = 0;
    videoModel: CareplusVideoModel = new CareplusVideoModel({
        bigTitle: 'Assista nosso vídeo de como nossas ações estamos fazendo um mundo melhor.',
        video: {
            link: 'http://static.videogular.com/assets/videos/videogular.mp4',
            type: 'video/mp4'
        },
    });
    infoSections: InfoSectionModel[] = [
        new InfoSectionModel({
            smallTitle: 'PROGRAMAS SOCIAIS E SUSTENTÁVEIS',
            bigTitle: 'Veja todas as nossas iniciativas sustentaveis e responsabilidade social',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et mi, ullamcorper enim phasellus tortor.',
            subDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo gravida quam scelerisque molestie vitae eget tempus gravida. Quis quis accumsan etiam enim. Aliquet amet in commodo lobortis et etiam neque enim, ac. Nisi, eros cursus senectus eget ullamcorper tellus etiam et id. ',
            imageSrc: 'assets/img/programas-sociais-section.jpg',
            reverse: false
        }),
        new InfoSectionModel({
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et mi, ullamcorper enim phasellus tortor.',
            subDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo gravida quam scelerisque molestie vitae eget tempus gravida. Quis quis accumsan etiam enim. Aliquet amet in commodo lobortis et etiam neque enim, ac. Nisi, eros cursus senectus eget ullamcorper tellus etiam et id. ',
            imageSrc: 'assets/img/social-programs-section-second-image.jpg',
            reverse: true,
            alignCenter: true
        }),
        new InfoSectionModel({
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et mi, ullamcorper enim phasellus tortor.',
            subDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo gravida quam scelerisque molestie vitae eget tempus gravida. Quis quis accumsan etiam enim. Aliquet amet in commodo lobortis et etiam neque enim, ac. Nisi, eros cursus senectus eget ullamcorper tellus etiam et id. ',
            imageSrc: 'assets/img/social-program-third-image.jpg',
            reverse: false,
            alignCenter: true
        }),
        new InfoSectionModel({
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et mi, ullamcorper enim phasellus tortor.',
            subDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo gravida quam scelerisque molestie vitae eget tempus gravida. Quis quis accumsan etiam enim. Aliquet amet in commodo lobortis et etiam neque enim, ac. Nisi, eros cursus senectus eget ullamcorper tellus etiam et id. ',
            imageSrc: 'assets/img/section-program-fourth-image.jpg',
            reverse: true,
            alignCenter: true
        })
    ];

    constructor(
        private windowRef: WindowRef,
        @Inject(PLATFORM_ID) platformId: Platform,
        private title: Title,
        private meta: Meta
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
            if (this.width < 1024) {
                this.offset = 72;
            } else {
                this.offset = 0;
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
                this.offset = 0;
            }
        }
    }

    goToNextSection() {
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: (this.iniciativaSection.nativeElement.offsetTop - this.offset),
            behavior: 'smooth'
        });
    }


    setSEOinfos() {
        this.title.setTitle('Responsabilidade Social | Care Plus | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Aqui você pode conferir as ações de responsabilidade social da Care Plus para um mundo melhor.'
        });
    }

}
