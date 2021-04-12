import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { RouteModel } from 'src/app/models';
import { Title, Meta } from '@angular/platform-browser';
import { EventEmitterService } from 'src/app/services';
import { origins } from './data/mock';
import { ActivatedRoute, Router } from '@angular/router';
declare var gtag: any;

@Component({
    selector: 'app-obrigado',
    templateUrl: './obrigado.component.html',
    styleUrls: ['./obrigado.component.scss']
})
export class ObrigadoComponent implements OnInit {
    faHome = faHome;
    origins = origins;
    selectedOrigin = origins[0];
    protocol: number;
    constructor(
        private title: Title,
        private meta: Meta,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        EventEmitterService.get<RouteModel>('custouRoute').emit(new RouteModel({
            description: 'Obrigado'
        }));

        this.activatedRoute.params.subscribe(params => {
            this.setSelectedOrigin(params.id)
            if (params.protocol) {
                this.protocol = params.protocol;
            }
        });

        /* Google Tag Manager */
        this.activatedRoute.queryParams.subscribe(queryParams => {
            if (queryParams.saude == '1') {
                gtag('config', 'AW-618331359');
                gtag('event', 'conversion', { 'send_to': 'AW-618331359/_PGlCMz7nIACEN_566YC' });
            }

            if (queryParams.odontologico == '1') {
                gtag('config', 'AW-454985144');
                gtag('event', 'conversion', { 'send_to': 'AW-454985144/F5f5CND8hYACELiL-tgB' });
            }

            if (queryParams.ocupacional == '1') {
                gtag('config', 'AW-684184155');
                gtag('event', 'conversion', { 'send_to': 'AW-684184155/ahKhCPX3nIACENukn8YC' });
            }
        });

    }

    ngOnInit() {
    }

    private setSEOInfos(infos) {
        this.title.setTitle(infos.title);
        this.meta.updateTag({
            name: 'description',
            content: 'Obrigado pelo interesse em contar com o plano líder no Brasil! Em breve entraremos em contato.'
        });
    }

    private setSelectedOrigin(id) {
        const origin = origins.find(origin => origin.id == id);
        if (origin) {
            this.selectedOrigin = origin
            this.setSEOInfos(origin);
        } else {
            this.router.navigate(['/error'])
        }
    }

}

