import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbModel, RouteModel } from 'src/app/models';
import { Title, Meta } from '@angular/platform-browser';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter-service.service';

@Component({
  selector: 'app-obrigado',
  templateUrl: './obrigado.component.html',
  styleUrls: ['./obrigado.component.scss']
})
export class ObrigadoComponent implements OnInit {
faHome = faHome;
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            name: 'Home',
            link: '/home'
        }),
        new BreadcrumbModel({
            name: 'Obrigado',
            link: '/obrigado',
            active: true
        }),
    ];
    constructor(
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOInfos();
        EventEmitterService.get<RouteModel>('custouRoute').emit(new RouteModel({
            description: 'Obrigado'
        }));
    }

    ngOnInit() {
    }

    private setSEOInfos() {
        this.title.setTitle('Obrigado | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Obrigado pelo interesse em contar com o plano líder no Brasil! Em breve entraremos em contato.'
        });
    }

}

