import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { RouteModel } from 'src/app/models';
import { Title, Meta } from '@angular/platform-browser';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter-service.service';
import { origins } from './data/mock';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-obrigado',
    templateUrl: './obrigado.component.html',
    styleUrls: ['./obrigado.component.scss']
})
export class ObrigadoComponent implements OnInit {
    faHome = faHome;
    origins = origins;
    selectedOrigin = origins[0];
    constructor(
        private title: Title,
        private meta: Meta,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.setSEOInfos();
        EventEmitterService.get<RouteModel>('custouRoute').emit(new RouteModel({
            description: 'Obrigado'
        }));

        this.activatedRoute.params.subscribe(params => {
            this.setSelectedOrigin(params.id)
        })
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

    private setSelectedOrigin(id) {
        const origin = origins.find(origin => origin.id == id);
        if (origin) {
            this.selectedOrigin = origin
        } else {
            this.router.navigate(['/error'])
        }
    }

}

