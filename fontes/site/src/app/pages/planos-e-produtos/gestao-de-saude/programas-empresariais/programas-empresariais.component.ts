import { Component, OnInit, ElementRef } from '@angular/core';
import { simpleBannerModel, campanhaDeQuestionariosSection, nutriNaEmpresa, nutriMais, gestaoDeSaudeSection } from './data/programas-empresariais-mock';
import { WindowRef } from 'src/utils/window-ref';
import { Title, Meta } from '@angular/platform-browser';

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
    }
}
