import { Injectable, EventEmitter } from '@angular/core';
import { RouteModel } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  routesChanged: EventEmitter<RouteModel[]> = new EventEmitter();
  routes: RouteModel[] = [];

  constructor() { }

  set state(routes: RouteModel[] | null) {
    this.routes = routes;
    this.routesChanged.emit(routes);
  }

  get state(): RouteModel[] {
    return this.routes;
  }
}
