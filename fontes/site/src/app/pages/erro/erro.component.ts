import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbModel, RouteModel } from 'src/app/models';
import { Title, Meta } from '@angular/platform-browser';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter-service.service';

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
            link: '/home'
        }),
        new BreadcrumbModel({
            name: 'Error 404 Page not found',
            link: '/error',
            active: true
        }),
    ];
    constructor(
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOInfos();
        EventEmitterService.get<RouteModel>('custouRoute').emit(new RouteModel({
            description: 'Erro - 404'
        }));
    }

    ngOnInit() {
    }

    private setSEOInfos() {
        this.title.setTitle('Página não Encontrada | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Você pode realizar uma busca em nosso site ou voltar para a nossa home principal. Você também consegue navegar pelo nosso site através do cabeçalho.'
        });
    }

}
