import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BreadcrumbModel } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter-service.service';
import { WindowRef } from 'src/utils/window-ref';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-form-section',
    templateUrl: './form-section.component.html',
    styleUrls: ['./form-section.component.scss']
})
export class FormSectionComponent implements OnInit {
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            name: 'Home',
            link: '/',
        }),
        new BreadcrumbModel({
            name: 'Fale Conosco',
            link: '/fale-conosco/solicite-uma-cotacao',
            active: true
        })
    ];
    chanelForms = [
        {
            title: 'Solicite uma Cotação',
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
        title: 'Solicite uma Cotação',
        id: 1,
        active: true,
        slug: 'solicite-uma-cotacao'
    };
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private windowRef: WindowRef
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
        /*
            Solução temporária para primeira publicação do site.
        */
        if (index == 0) {
            this.activeChanel = this.chanelForms[0];
        } else {
            switch(index) {
                case 1:
                    this.windowRef.nativeWindow.open(`${environment.CAREPLUS_URL}portal/modulos/atendimento/inclusaoDemandaContato.aspx`, '_blank');
                break;
                case 2:
                    this.windowRef.nativeWindow.open(`${environment.CAREPLUS_URL}portal/modulos/home/canalDenuncias.aspx`, '_blank');
                break;
                case 3:
                    this.windowRef.nativeWindow.open(`${environment.CAREPLUS_URL}portal/modulos/atendimento/inclusaoDemandaOuvidoria.aspx`, '_blank');
                break;
            }
        }
    }

}