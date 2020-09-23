import { Component, OnInit, ElementRef } from '@angular/core';
import { HeroBannerModel, InfoSectionModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';
import { Title, Meta } from '@angular/platform-browser';
import { heroBannerModel, infoSections } from './data/mock';

@Component({
    selector: 'app-gestao-de-saude',
    templateUrl: './gestao-de-saude.component.html',
    
})
export class GestaoDeSaudeComponent implements OnInit {
    heroBannerModel: HeroBannerModel = heroBannerModel;
    infoSections: InfoSectionModel[] = infoSections;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private windowRef: WindowRef,
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    goToSection(selector: string) {
        const element = this.elementRef.nativeElement.querySelector<HTMLElement>(selector)
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: element.offsetTop - parseInt(localStorage.getItem('elementOffset')),
            behavior: 'smooth',
        })
    }

    private setSEOInfos() {
        this.title.setTitle('Gestão de Saúde | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Gestão de Saúde: o jeito Care Plus de cuidar da sua saúde e bem-estar.'
        });
    }

}
