import { Component, OnInit } from '@angular/core';
import { BreadcrumbModel } from 'src/app/models';

@Component({
    selector: 'app-form-section',
    templateUrl: './form-section.component.html',
    styleUrls: ['./form-section.component.scss']
})
export class FormSectionComponent implements OnInit {
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            name: 'Home',
            link: '/home',
        }),
        new BreadcrumbModel({
            name: 'Fale conosco',
            link: '/fale-conosco',
            active: true
        })
    ];
    chanelForms = [
        {
            title: 'Solicite uma cotação',
            id: 1,
            active: true
        },
        {
            title: 'Fale Conosco',
            id: 2,
            active: false
        },
        {
            title: 'Canal de Denúncias',
            id: 3,
            active: false
        },
        {
            title: 'Ouvidoria',
            id: 4,
            active: false
        }
    ];
    activeChanel = {
        title: 'Solicite uma cotação',
        id: 1,
        active: true
    };

    constructor() { }

    ngOnInit() {
    }

    setActiveChanel(index: number) {
        this.chanelForms = this.chanelForms.map((chanel, i) => {
            if (i === index) {
                chanel.active = true
                this.activeChanel = chanel;
            } else {
                chanel.active = false
            }
            return chanel
        })
    }

}
