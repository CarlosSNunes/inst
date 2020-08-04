import { Component, OnInit, ElementRef } from '@angular/core';
import { SimpleBannerModel, BreadcrumbModel, InfoSectionModel, IconCardsSectionModel, ButtonModel } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowRef } from 'src/utils/window-ref';
import { Meta, Title } from '@angular/platform-browser';
import { plansMock, sectionAboutPlan, travelSection, dentalSection, plansSection, clinicSection, secondCard, } from './data/plans-mock';
import Cards from './data/cards';

@Component({
    selector: 'app-detalhes-do-produto',
    templateUrl: './detalhes-do-produto.component.html',
    styleUrls: ['./detalhes-do-produto.component.scss']
})
export class DetalhesDoProdutoComponent implements OnInit {
    simpleBannerModel: SimpleBannerModel = {
        hasAnchor: true,
    };
    id: string = '';
    ids = plansMock;
    sectionAboutPlan = sectionAboutPlan;
    travelSection = travelSection
    dentalSection = dentalSection;
    plansSection = plansSection;
    clinicSection = clinicSection;
    secondCard = secondCard;
    selectedOptionId: number = 1;
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
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private elementRef: ElementRef<HTMLElement>,
        private windowRef: WindowRef,
        private meta: Meta,
        private title: Title
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.id = params.id;
            this.simpleBannerModel.breadcrumbs = [
                new BreadcrumbModel({
                    name: 'Home',
                    link: '/home',
                }),
                new BreadcrumbModel({
                    name: 'Planos e Produtos',
                    link: '/produtos-e-planos-careplus',
                }),
            ];
            const findedId = this.ids.find(id => id.id === this.id);
            if (findedId) {
                this.sectionAboutPlan = new InfoSectionModel(findedId.aboutPlan);
                this.setSEOInfos(findedId);
                this.simpleBannerModel.title = findedId.title;
                this.simpleBannerModel.description = findedId.description;
                this.simpleBannerModel.image = findedId.image;
                this.simpleBannerModel.breadcrumbs.push(new BreadcrumbModel({
                    name: findedId.name,
                    link: `/produtos-e-planos-careplus/${this.id}`,
                    active: true
                }));
            } else {
                this.router.navigate(['/error']);
            }
        });
    }

    ngOnInit() {
    }

    goToSection(anchor: string, selectedOptionId?: number) {
        const htmlElement = this.elementRef.nativeElement.querySelector<HTMLElement>(anchor);
        if (htmlElement) {
            this.windowRef.nativeWindow.scrollTo({
                left: 0,
                top: htmlElement.offsetTop - parseInt(localStorage.getItem('elementOffset')),
                behavior: 'smooth'
            });
            if (selectedOptionId) {
                this.selectedOptionId = selectedOptionId;
            }
        } else {
            console.error(`No html element found with id "${anchor}"`)
        }
    }

    setSEOInfos(infos) {
        this.title.setTitle(`${infos.name} | Produtos e Planos | Care Plus`)
        this.meta.updateTag({
            name: 'description',
            content: 'Faça uma simulação do perfil da sua empresa aqui no site da Care Plus e confira os produtos e planos que mais se adequam.'
        })
    }

}
