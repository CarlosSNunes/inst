import { Component, OnInit, ElementRef } from '@angular/core';
import { simpleBannerModel, mommyCareSection, gerenciamentoDeDoencasCronicas, programaDeAcolhimento, mentalHealth, cuidadosDaFamilia, iconCardsSectionModel, checkupDoViajante, monitoramentoDoCheckup } from './data/mock-data';
import { Title, Meta } from '@angular/platform-browser';
import { WindowRef } from 'src/utils/window-ref';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-programas-preventivos',
    templateUrl: './programas-preventivos.component.html',
    styleUrls: ['./programas-preventivos.component.scss']
})
export class ProgramasPreventivosComponent implements OnInit {
    simpleBannerModel = simpleBannerModel;
    mommyCareSection = mommyCareSection;
    gerenciamentoDeDoencasCronicas = gerenciamentoDeDoencasCronicas;
    programaDeAcolhimento = programaDeAcolhimento;
    mentalHealth = mentalHealth;
    cuidadosDaFamilia = cuidadosDaFamilia;
    iconCardsSectionModel = iconCardsSectionModel;
    checkupDoViajanteSection = checkupDoViajante;
    monitoramentoDoCheckupSection = monitoramentoDoCheckup;

    constructor(
        private title: Title,
        private meta: Meta,
        private elementRef: ElementRef<HTMLElement>,
        private windowRef: WindowRef
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    private setSEOInfos() {
        this.title.setTitle('Programas Preventivos | Gestão de Saúde | Produtos de Saúde e Odontológicos | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Programas Preventivos | Gestão de Saúde | Produtos de Saúde e Odontológicos | Care Plus'
        });

         /* 
            Open graph meta tags
        */
            this.meta.updateTag({
                name: "og:title",
                content:
                    'Programas Preventivos | Gestão de Saúde | Produtos de Saúde e Odontológicos | Care Plus',
            });
    
            this.meta.updateTag({
                name: "og:type",
                content:
                    "website",
            });

    
            this.meta.updateTag({
                name: "og:description",
                content: 'Confira aqui as perguntas frequentes dos Beneficiários, RHs, Corretores e Credenciados e encontre respostas e soluções para suas dúvidas.'
            });
    
            this.meta.updateTag({
                name: "og:url",
                content: `${environment.SELF_URL}/planos-e-produtos/gestao-de-saude/programas-preventivos`,
            });
            this.meta.updateTag({
                name: "og:image",
                content:`${environment.SELF_URL}/assets/img/programas-preventivos.jpg`,
            });
    
            /* 
                Twitter meta tags
            */
    
            this.meta.updateTag({
                name: "twitter:title",
                content:
                    'Programas Preventivos | Gestão de Saúde | Produtos de Saúde e Odontológicos | Care Plus',
            });
    
            this.meta.updateTag({
                name: "twitter:card",
                content:
                    "summary_large_image",
            });
    
            this.meta.updateTag({
                name: "twitter:description",
                content: 'Confira aqui as perguntas frequentes dos Beneficiários, RHs, Corretores e Credenciados e encontre respostas e soluções para suas dúvidas.'
            });
    
            this.meta.updateTag({
                name: "twitter:url",
                content: `${environment.SELF_URL}/planos-e-produtos/gestao-de-saude/programas-preventivos`,
            });
            this.meta.updateTag({
                name: "twitter:image",
                content:`${environment.SELF_URL}/assets/img/programas-preventivos.jpg`,
            });
    }

    goToSection(anchor: string) {
        const element = this.elementRef.nativeElement.querySelector(anchor) as HTMLElement;
        if (element) {
            this.windowRef.nativeWindow.scrollTo({
                left: 0,
                top: element.offsetTop - parseInt(localStorage.getItem('elementOffset')),
                behavior: 'smooth'
            });
        }
    }

}
