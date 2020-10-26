import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbModel, RouteModel } from 'src/app/models';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { CanonicalService, EventEmitterService } from 'src/app/services';

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
    constructor(
        private title: Title,
        private meta: Meta,
        private canonicalService: CanonicalService
    ) {
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

        // TODO
        /*
            Quando o NEOCMS estiver pronto as imagens ficarão em outro server e possuirão um caminho absoluto.
        */
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

        // TODO
        /*
            Quando o NEOCMS estiver pronto as imagens ficarão em outro server e possuirão um caminho absoluto.
        */
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
