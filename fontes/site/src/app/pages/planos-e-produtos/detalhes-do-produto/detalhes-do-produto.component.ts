import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowRef } from 'src/utils/window-ref';
import { Meta, Title } from '@angular/platform-browser';
import { plansMock } from './data/plans-mock';

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
    findedPlan: any = {};

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
            const findedId = this.ids.find(id => id.id === this.id);
            this.findedPlan = findedId;
            if (findedId) {
                this.setSEOInfos(findedId);
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
        this.title.setTitle(`${infos.name} | Produtos e Planos | Care Plus`)
        this.meta.updateTag({
            name: 'description',
            content: 'Faça uma simulação do perfil da sua empresa aqui no site da Care Plus e confira os produtos e planos que mais se adequam.'
        })
    }

}
