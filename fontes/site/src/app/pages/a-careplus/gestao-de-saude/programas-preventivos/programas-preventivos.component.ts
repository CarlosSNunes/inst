import { Component, OnInit, ElementRef } from '@angular/core';
import { simpleBannerModel, mommyCareSection, gerenciamentoDeDoencasCronicas, programaDeAcolhimento, mentalHealth, cuidadosDaFamilia, iconCardsSectionModel, checkupDoViajante, monitoramentoDoCheckup } from './data/mock-data';
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
            content: 'A Care Plus oferece programas preventivos para você começar a cuidar da saúde, desta forma, além de reduzir o risco de patologias, você pode levar uma vida mais saudável e segura.'
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
