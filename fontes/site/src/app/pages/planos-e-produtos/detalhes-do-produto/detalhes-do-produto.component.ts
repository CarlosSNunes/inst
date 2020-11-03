import { Component, OnInit, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowRef } from 'src/utils/window-ref';
import { Meta, Title } from '@angular/platform-browser';
import { plansMock } from './data/plans-mock';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-detalhes-do-produto',
    templateUrl: './detalhes-do-produto.component.html',
    styleUrls: ['./detalhes-do-produto.component.scss']
})
export class DetalhesDoProdutoComponent implements OnInit, AfterViewInit {
    id: string = '';
    ids = plansMock;
    selectedOptionId: number = 1;
    queryParams: any = {};
    foundPlan: any = {};

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
            const foundId = this.ids.find(id => id.id === this.id);
            this.foundPlan = foundId;
            if (foundId) {
                this.setSEOInfos(foundId);
                this.queryParams = {
                    plano: this.id
                }
            } else {
                this.router.navigate(['/error']);
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.activatedRoute.fragment.subscribe(fragment => {
            switch (fragment) {
                case 'planos-de-saude':
                    setTimeout(() => {
                        this.goToSection('#products', 1)
                    }, 300);
                    break;
                case 'planos-odontologicos':
                    setTimeout(() => {
                        this.goToSection('#products', 2)
                    }, 300);
                    break
                default:
                    break;
            }
        })
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
        this.title.setTitle(infos.title)
        this.meta.updateTag({
            name: 'description',
            content: infos.description
        })

        /* 
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content: infos.title
        });

        this.meta.updateTag({
            name: "og:type",
            content:
                "website",
        });

        // TODO
        /*
            Quando o NEOCMS estiver pronto as imagens ficarão em outro server e possuirão um caminho absoluto.
        */
        this.meta.updateTag({
            name: "og:image",
            content: `${environment.SELF_URL}/${this.foundPlan.simpleBannerModel.image}`,
        });

        this.meta.updateTag({
            name: "og:description",
            content: 'Faça uma simulação do perfil da sua empresa aqui no site da Care Plus e confira os produtos e planos que mais se adequam.'
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/planos-e-produtos/${this.foundPlan.id}`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content: infos.title
        });

        this.meta.updateTag({
            name: "twitter:card",
            content:
                "summary_large_image",
        });

        // TODO
        /*
            Quando o NEOCMS estiver pronto as imagens ficarão em outro server e possuirão um caminho absoluto.
        */
        this.meta.updateTag({
            name: "twitter:image",
            content: `${environment.SELF_URL}/${this.foundPlan.simpleBannerModel.image}`,
        });

        this.meta.updateTag({
            name: "twitter:description",
            content: infos.description
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/planos-e-produtos/${this.foundPlan.id}`,
        });
    }

}
