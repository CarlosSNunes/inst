import { Component, OnInit, Input } from '@angular/core';
import Posts from './data/posts';

@Component({
    selector: 'app-careplus-plus',
    templateUrl: './careplus-plus.component.html',
    styleUrls: ['./careplus-plus.component.scss']
})
export class CareplusPlusComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    @Input() title: string = '+ Saúde com + Informação: aproveite todos os nossos conteúdos sobre saúde e bem-estar';
    posts = Posts;
    constructor() { }

    ngOnInit() {
    }

}
