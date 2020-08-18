import { Component, OnInit, Input } from '@angular/core';
import { moreAboutMock } from './data/MoreAboutMock'

@Component({
    selector: 'app-more-about',
    templateUrl: './more-about.component.html',
    styleUrls: ['./more-about.component.scss']
})
export class MoreAboutComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    @Input() type: string = 'full'

    about = moreAboutMock;

    constructor() { }

    ngOnInit() {
    }

}
