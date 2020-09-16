import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BreadcrumbModel } from 'src/app/models';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter-service.service';

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
            name: 'Fale Conosco',
            link: '/fale-conosco',
            active: true
        })
    ];
    chanelForms = [
        {
            title: 'Solicite uma cotação',
            id: 1,
            active: true,
            slug: 'solicite-uma-cotacao'
        },
        {
            title: 'Contato',
            id: 2,
            active: false,
            slug: 'contato'
        },
        {
            title: 'Canal de Denúncias',
            id: 3,
            active: false,
            slug: 'canal-de-denuncias'
        },
        {
            title: 'Ouvidoria',
            id: 4,
            active: false,
            slug: 'ouvidoria'
        }
    ];
    activeChanel = {
        title: 'Solicite uma cotação',
        id: 1,
        active: true,
        slug: 'solicite-uma-cotacao'
    };
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {
        this.setActiveChanel(0);
        this.activatedRoute.params.subscribe(params => {
            if (params.id) {
                const chanel = this.chanelForms.find(chanel => params.id == chanel.slug)
                if (!chanel) {
                    this.router.navigate(['/error']);
                }
                this.setActiveChanel(chanel.id - 1)
            }
        });

        EventEmitterService.get('fale-conosco-form').subscribe(slug => {
            const chanel = this.chanelForms.find(chanel => slug == chanel.slug)
            if (!chanel) {
                this.router.navigate(['/error']);
            }
            this.setActiveChanel(chanel.id - 1);
            this.cdr.detectChanges();
        }); 
    }

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
