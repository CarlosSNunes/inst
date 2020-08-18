import { Component, OnInit, Input } from '@angular/core';
import Profiles from './data/profiles';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    profiles = Profiles;
    @Input() backgroundColorClass: string = 'white-background-color';
    constructor() { }

    ngOnInit() {
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
