import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { RouteModel } from 'src/app/models';
import { Title, Meta } from '@angular/platform-browser';
import { EventEmitterService, ScriptLoaderService } from 'src/app/services';
import { origins } from './data/mock';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
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
    isBrowser: boolean = false;
    public getScreenWidth: any;
    constructor(
        private title: Title,
        private meta: Meta,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private scriptLoaderService: ScriptLoaderService,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: object
    ) {
        EventEmitterService.get<RouteModel>('custouRoute').emit(new RouteModel({
            description: 'Obrigado'
        }));

        this.isBrowser = isPlatformBrowser(this.platformId);

        this.activatedRoute.params.subscribe(params => {
            this.setSelectedOrigin(params.id)
            if (params.protocol) {
                this.protocol = params.protocol;
            }
        });

        if (this.isBrowser) {
            this.emitGoogleEvents();
        }

    }

    ngOnInit() {
        this.onWindowResize();
    }

    @HostListener('window:resize')
    onWindowResize() {
        this.getScreenWidth = window.innerWidth;
    }

    private emitGoogleEvents() {
        /* Google Tag Manager */
        this.activatedRoute.queryParams.subscribe(queryParams => {
            if (queryParams.saude == '1') {

                const scriptObjs: Array<Partial<HTMLScriptElement>> = [
                    {
                        id: 'tgm-call-AW-618331359',
                        async: true,
                        src: 'https://www.googletagmanager.com/gtag/js?id=AW-454985144',
                    },
                    {
                        id: 'tgm-init-AW-618331359',
                        text: `window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date());`
                    }
                ];

                scriptObjs.forEach(obj => {
                    if (!this.document.getElementById(obj.id)) {
                        this.scriptLoaderService.injectScript(obj, 'head');
                    }
                });

                gtag('config', 'AW-618331359');
                gtag('event', 'conversion', { 'send_to': 'AW-618331359/_PGlCMz7nIACEN_566YC' })
            }

            if (queryParams.odontologico == '1') {

                const scriptObjs: Array<Partial<HTMLScriptElement>> = [
                    {
                        id: 'tgm-call-AW-454985144',
                        async: true,
                        src: 'https://www.googletagmanager.com/gtag/js?id=AW-454985144',
                    },
                    {
                        id: 'tgm-init-AW-454985144',
                        text: `window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date());`
                    }
                ];

                scriptObjs.forEach(obj => {
                    if (!this.document.getElementById(obj.id)) {
                        this.scriptLoaderService.injectScript(obj, 'head');
                    }
                });

                gtag('config', 'AW-454985144');
                gtag('event', 'conversion', { 'send_to': 'AW-454985144/F5f5CND8hYACELiL-tgB' });
            }

            if (queryParams.ocupacional == '1') {

                const scriptObjs: Array<Partial<HTMLScriptElement>> = [
                    {
                        id: 'tgm-call-AW-684184155',
                        async: true,
                        src: 'https://www.googletagmanager.com/gtag/js?id=AW-684184155',
                    },
                    {
                        id: 'tgm-init-AW-684184155',
                        text: `window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date());`
                    }
                ];

                scriptObjs.forEach(obj => {
                    if (!this.document.getElementById(obj.id)) {
                        this.scriptLoaderService.injectScript(obj, 'head');
                    }
                });

                gtag('config', 'AW-684184155');
                gtag('event', 'conversion', { 'send_to': 'AW-684184155/ahKhCPX3nIACENukn8YC' });
            }
        });
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

