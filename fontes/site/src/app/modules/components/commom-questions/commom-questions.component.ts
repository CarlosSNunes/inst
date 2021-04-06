import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-commom-questions',
    templateUrl: './commom-questions.component.html',
    styleUrls: ['./commom-questions.component.scss']
})
export class CommomQuestionsComponent implements OnInit {
    isBrowser: boolean = false;
    @Input() htag: string = 'h5';
    constructor() {

    }

    ngOnInit() {
    }

}
