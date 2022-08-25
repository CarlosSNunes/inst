import { Component, OnInit, Input, HostListener } from '@angular/core';
import Profiles from './data/profiles';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    profiles = Profiles;
    @Input() backgroundColorClass: string = 'white-background-color';
    public getScreenWidth: any;
    constructor() { }

    ngOnInit() {
        this.onWindowResize();
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize() {
        this.getScreenWidth = window.innerWidth;
    }

    setActiveProfile(index: number) {
        this.profiles = this.profiles.map((p, i) => {
            if (i === index) {
                p.active = true;
            } else {
                p.active = false;
            }
            return p
        });
    }

}
