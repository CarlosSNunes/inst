import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter-service.service';
import { RouteModel } from 'src/app/models';

@Component({
    selector: 'app-fale-conosco',
    templateUrl: './fale-conosco.component.html',

})
export class FaleConoscoComponent implements OnInit {
    constructor() {
        EventEmitterService.get<RouteModel>('custouRoute').emit(new RouteModel({
            description: 'Fale conosco'
        }));
    }

    ngOnInit() {
    }
}
