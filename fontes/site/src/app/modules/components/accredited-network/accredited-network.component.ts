import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
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
    public mobileOrDesktop: any;
    constructor() { }

    ngOnInit() {
        this.onWindowResize();
    }

    @HostListener('window:resize')
    onWindowResize() {
        if (window.innerWidth >= 1023) {
            this.mobileOrDesktop = 'btn btn-digital-cian secondary medium is-hidden-touch'
        } else {
            this.mobileOrDesktop = 'btn btn-digital-cian tertiary arrow-right medium is-hidden-desktop'
        }
    }

    get offsetTop(): number {
        return this.accreditedNetwork.nativeElement.offsetTop;
    }

}
