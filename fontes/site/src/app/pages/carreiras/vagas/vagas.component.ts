import { Component, ElementRef, OnInit } from '@angular/core';
import { BreadcrumbModel, SimpleBannerModel, CrossContentModel, ButtonModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-vagas',
    templateUrl: './vagas.component.html',

})
export class VagasComponent implements OnInit {
    simpleBannerModel: SimpleBannerModel = {
        title: 'Venha fazer parte de um time apaixonado em cuidar de pessoas!',
        description: 'Nosso objetivo é acompanhar o colaborador em sua carreira e, juntos, criarmos uma história sólida e de muito aprendizado.',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/',
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
        bigTitle: 'Mais do que trabalhar com líderes inspiradores, nós queremos que você seja um!',
        firstImage: {
            src: 'assets/img/Carreira_Vagas_1.png',
            alt: 'Banco de dados imagem 1'
        },
        secondImage: {
            src: 'assets/img/Carreira_Vagas_2.png',
            alt: 'Banco de dados imagem 2'
        },
        boxContent: {
            title: 'Cadastre-se para fazer parte do nosso banco de talentos, ver todas as vagas ou saber de oportunidades futuras',
            description: 'Para fazer parte deste time de talentos, envie seus dados. Se não houver vagas para o seu perfil, fique tranquilo, seu currículo ficará guardado em nosso banco de dados para futuras oportunidades.',
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
        this.title.setTitle('Vagas e Oportunidades | Carreiras | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Conheça os nossos programas, vagas e oportunidades em aberto. A Care Plus é uma das melhores empresas no Brasil para se trabalhar.'
        });

        /* 
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                'Vagas e Oportunidades | Carreiras | Care Plus'
        });

        this.meta.updateTag({
            name: "og:type",
            content:
                "website",
        });

        this.meta.updateTag({
            name: "og:image",
            content: `${environment.SELF_URL}/${this.simpleBannerModel.image}`,
        });

        this.meta.updateTag({
            name: "og:description",
            content: 'Conheça os nossos programas, vagas e oportunidades em aberto. A Care Plus é uma das melhores empresas no Brasil para se trabalhar.'
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/carreiras/vagas`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                'Vagas e Oportunidades | Carreiras | Care Plus'
        });

        this.meta.updateTag({
            name: "twitter:card",
            content:
                "summary_large_image",
        });

        this.meta.updateTag({
            name: "twitter:image",
            content: `${environment.SELF_URL}/${this.simpleBannerModel.image}`,
        });

        this.meta.updateTag({
            name: "twitter:description",
            content: 'Conheça os nossos programas, vagas e oportunidades em aberto. A Care Plus é uma das melhores empresas no Brasil para se trabalhar.'
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/carreiras/vagas`,
        });
    }

}
