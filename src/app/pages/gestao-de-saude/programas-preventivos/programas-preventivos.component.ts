import { Component, OnInit, ElementRef } from '@angular/core';
import { simpleBannerModel, mommyCareSection, prevencaoDeDoencasCardiovascularesSection, programaDeAcolhimento, mentalHealth, cuidadosDaFamilia, programaDeCuidadoOncologico, iconCardsSectionModel } from './data/mock-data';
import { Title, Meta } from '@angular/platform-browser';
import { WindowRef } from 'src/utils/window-ref';


@Component({
    selector: 'app-programas-preventivos',
    templateUrl: './programas-preventivos.component.html',
    styleUrls: ['./programas-preventivos.component.scss']
})
export class ProgramasPreventivosComponent implements OnInit {
    simpleBannerModel = simpleBannerModel;
    mommyCareSection = mommyCareSection;
    prevDeDoencasCardioSection = prevencaoDeDoencasCardiovascularesSection;
    programaDeAcolhimento = programaDeAcolhimento;
    mentalHealth = mentalHealth;
    cuidadosDaFamilia = cuidadosDaFamilia;
    programaDeCuidadoOncologico = programaDeCuidadoOncologico;
    iconCardsSectionModel = iconCardsSectionModel;
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

    setSEOInfos() {
        this.title.setTitle('Programas Preventivos | Gestão de Saúde | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A hora de cuidar da sua saúde é agora. Conheça os programas preventivos Care Plus e descubra o ideal para você.'
        });
    }

    goToSection(anchor: string) {
        const element = this.elementRef.nativeElement.querySelector(anchor) as HTMLElement;
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: element.offsetTop - parseInt(localStorage.getItem('elementOffset')),
            behavior: 'smooth'
        })
    }

}
