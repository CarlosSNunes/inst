import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-accredited-network',
    templateUrl: './accredited-network.component.html',
    styleUrls: ['./accredited-network.component.scss']
})
export class AccreditedNetworkComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    @ViewChild('accreditedNetwork', { static: false }) accreditedNetwork: ElementRef<HTMLElement>;
    constructor() { }

    ngOnInit() {
    }

    get offsetTop(): number {
        return this.accreditedNetwork.nativeElement.offsetTop;
    }

}