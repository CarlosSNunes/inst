import { Component, OnInit } from '@angular/core';
import { questionsMock } from './data/commomQuestionsMock';

@Component({
    selector: 'app-commom-questions',
    templateUrl: './commom-questions.component.html',
    styleUrls: ['./commom-questions.component.scss']
})
export class CommomQuestionsComponent implements OnInit {
    questions = questionsMock;
    isBrowser: boolean = false;
    constructor() {

    }

    ngOnInit() {
    }

}
