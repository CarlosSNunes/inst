import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter-service.service';
import { RouteModel } from 'src/app/models';

@Component({
    selector: 'app-fale-conosco',
    templateUrl: './fale-conosco.component.html',
    styleUrls: ['']
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
    }
}
