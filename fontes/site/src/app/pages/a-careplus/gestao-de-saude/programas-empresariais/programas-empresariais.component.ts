import { Component, OnInit, ElementRef } from '@angular/core';
import { simpleBannerModel, campanhaDeQuestionariosSection, nutriNaEmpresa, nutriMais, gestaoDeSaudeSection } from './data/programas-empresariais-mock';
import { WindowRef } from 'src/utils/window-ref';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-programas-empresariais',
    templateUrl: './programas-empresariais.component.html',
    styleUrls: ['./programas-empresariais.component.scss']
})
export class ProgramasEmpresariaisComponent implements OnInit {
    simpleBannerModel = simpleBannerModel;
    campanhaDeQuestionariosSection = campanhaDeQuestionariosSection;
    nutriNaEmpresa = nutriNaEmpresa;
    nutriMais = nutriMais;
    iconCardsSectionModel = gestaoDeSaudeSection;

    constructor(
        private windowRef: WindowRef,
        private elementRef: ElementRef<HTMLElement>,
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    goToSection(anchor: string) {
        const elementToScroll = this.elementRef.nativeElement.querySelector(anchor) as HTMLElement;
        if (elementToScroll) {
            this.windowRef.nativeWindow.scrollTo({
                left: 0,
                top: elementToScroll.offsetTop - parseInt(localStorage.getItem('elementOffset')),
                behavior: "smooth"
            })
        }
    }

    setSEOInfos() {
        this.title.setTitle('Programas Empresariais | Gestão de Saúde | Produtos de Saúde e Odontológicos | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus oferece programas empresariais de atendimento altamente capacitado com médicos, nutricionistas, enfermeiros e psicólogos para todos os clientes.'
        });

          
         /* 
            Open graph meta tags
        */
            this.meta.updateTag({
                name: "og:title",
                content:
                    'Programas Empresariais | Gestão de Saúde | Produtos de Saúde e Odontológicos | Care Plus',
            });
    
            this.meta.updateTag({
                name: "og:type",
                content:
                    "website",
            });

    
            this.meta.updateTag({
                name: "og:description",
                content: 'A Care Plus oferece programas empresariais de atendimento altamente capacitado com médicos, nutricionistas, enfermeiros e psicólogos para todos os clientes.'
            });
    
            this.meta.updateTag({
                name: "og:url",
                content: `${environment.SELF_URL}/planos-e-produtos/gestao-de-saude/programas-empresariais`,
            });
            this.meta.updateTag({
                name: "og:image",
                content:`${environment.SELF_URL}/assets/img/banner-programas-empresariais.jpg`,
            });
    
            /* 
                Twitter meta tags
            */
    
            this.meta.updateTag({
                name: "twitter:title",
                content:
                    'Programas Empresariais | Gestão de Saúde | Produtos de Saúde e Odontológicos | Care Plus',
            });
    
            this.meta.updateTag({
                name: "twitter:card",
                content:
                    "summary_large_image",
            });
    
            this.meta.updateTag({
                name: "twitter:description",
                content: 'A Care Plus oferece programas empresariais de atendimento altamente capacitado com médicos, nutricionistas, enfermeiros e psicólogos para todos os clientes.'
            });
    
            this.meta.updateTag({
                name: "twitter:url",
                content: `${environment.SELF_URL}/planos-e-produtos/gestao-de-saude/programas-empresariais`,
            });
            this.meta.updateTag({
                name: "twitter:image",
                content:`${environment.SELF_URL}/assets/img/banner-programas-empresariais.jpg`,
            });
    }
}
