import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
    selector: 'app-join-the-team',
    templateUrl: './join-the-team.component.html',
    styleUrls: ['./join-the-team.component.scss']
})
export class JoinTheTeamComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    @Input() reverse: boolean = false;
    @Input() htag: string = 'h5';
    public mobileOrDesktop: any;
    constructor() { }

    ngOnInit() {
        this.onWindowResize();
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize() {
        if (window.innerWidth >= 1023) {
            this.mobileOrDesktop = 'btn btn-fuchsia secondary medium is-hidden-touch';
        } else {
            this.mobileOrDesktop = 'btn btn-fuchsia secondary tertiary arrow-right is-hidden-desktop';
        }
    }
}
