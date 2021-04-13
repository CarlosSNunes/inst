import { Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbModel, RouteModel } from 'src/app/models';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { CanonicalService, EventEmitterService } from 'src/app/services';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { isPlatformServer } from '@angular/common';

@Component({
    selector: 'app-erro',
    templateUrl: './erro.component.html',
    styleUrls: ['./erro.component.scss']
})
export class ErroComponent implements OnInit {
    faHome = faHome;
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            name: 'Home',
            link: '/'
        }),
        new BreadcrumbModel({
            name: 'Error 404 Page not found',
            link: '/error',
            active: true
        }),
    ];
    isServer: boolean = false;
    constructor(
        private title: Title,
        private meta: Meta,
        private canonicalService: CanonicalService,
        @Optional() @Inject(RESPONSE) private readonly res: Response,
        @Inject(PLATFORM_ID) private platformId: object
    ) {
        this.isServer = isPlatformServer(this.platformId);
        if (this.isServer) {
            this.res.status(404);
        }
        this.setSEOInfos();
        EventEmitterService.get<RouteModel>('custouRoute').emit(new RouteModel({
            description: 'Erro - 404'
        }));
        this.canonicalService.createCanonicalURL('/404/');
    }

    ngOnInit() {
    }

    private setSEOInfos() {
        this.title.setTitle('Página não Encontrada | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: ' Infelizmente não encontramos a página que você está procurando'
        });

        /* 
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                'Página não Encontrada | Care Plus'
        });

        this.meta.updateTag({
            name: "og:type",
            content:
                "website",
        });

        this.meta.updateTag({
            name: "og:image",
            content: `${environment.SELF_URL}/assets/svg/error-404.svg`,
        });

        this.meta.updateTag({
            name: "og:description",
            content: ' Infelizmente não encontramos a página que você está procurando '
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/erro`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                'Página não Encontrada | Care Plus'
        });

        this.meta.updateTag({
            name: "twitter:card",
            content:
                "summary_large_image",
        });

        this.meta.updateTag({
            name: "twitter:image",
            content: `${environment.SELF_URL}/assets/svg/error-404.svg`,
        });

        this.meta.updateTag({
            name: "twitter:description",
            content: ' Infelizmente não encontramos a página que você está procurando '
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/erro`,
        });
    }

}
