import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter-service.service';
import { RouteModel } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-fale-conosco',
    templateUrl: './fale-conosco.component.html',

})
export class FaleConoscoComponent implements OnInit {
    constructor(
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOInfos();
        EventEmitterService.get<RouteModel>('custouRoute').emit(new RouteModel({
            description: 'Fale conosco'
        }));
    }

    ngOnInit() {
    }

    private setSEOInfos() {
        this.title.setTitle('Fale Conosco | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Entre em contato com a Care Plus pelo formulário ou por um dos nossos canais de atendimento.'
        });

        /* 
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                'Fale Conosco | Care Plus'
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
            content: `${environment.SELF_URL}/assets/img/banner_home2.png`,
        });

        this.meta.updateTag({
            name: "og:description",
            content: 'Entre em contato com a Care Plus pelo formulário ou por um dos nossos canais de atendimento.'
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/fale-conosco/solicite-uma-cotacao`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                'Fale Conosco | Care Plus'
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
            content: `${environment.SELF_URL}/assets/img/banner_home2.png`,
        });

        this.meta.updateTag({
            name: "twitter:description",
            content: 'Entre em contato com a Care Plus pelo formulário ou por um dos nossos canais de atendimento.'
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/fale-conosco/solicite-uma-cotacao`,
        });
    }
}
