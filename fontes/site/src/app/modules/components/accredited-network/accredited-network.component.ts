import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-accredited-network',
    templateUrl: './accredited-network.component.html',
    styleUrls: ['./accredited-network.component.scss']
})
export class AccreditedNetworkComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    @Input() htag: string = 'h5';
    @ViewChild('accreditedNetwork', { static: false }) accreditedNetwork: ElementRef<HTMLElement>;
    accreditedNetworkUrl = `${environment.CAREPLUS_URL}portal/modulos/rede/pesquisaRedeCP.aspx`;
    constructor() { }

    ngOnInit() {
    }

    get offsetTop(): number {
        return this.accreditedNetwork.nativeElement.offsetTop;
    }

}