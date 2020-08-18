import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-app-careplus',
    templateUrl: './app-careplus.component.html',
    styleUrls: ['./app-careplus.component.scss']
})
export class AppCareplusComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    constructor() { }

    ngOnInit() {
    }

}
