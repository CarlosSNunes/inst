import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-join-the-team',
    templateUrl: './join-the-team.component.html',
    styleUrls: ['./join-the-team.component.scss']
})
export class JoinTheTeamComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    @Input() reverse: boolean = false;
    constructor() { }

    ngOnInit() {
    }

}
