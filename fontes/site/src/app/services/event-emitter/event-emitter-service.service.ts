import { EventEmitter } from '@angular/core';

export class EventEmitterService {

    private static emitters: {
        [eventName: string]: EventEmitter<any>
    } = {}

    static get<T = any> (eventName:string): EventEmitter<T> {
        if (!this.emitters[eventName])
            this.emitters[eventName] = new EventEmitter<T>();
        return this.emitters[eventName];
    }

}