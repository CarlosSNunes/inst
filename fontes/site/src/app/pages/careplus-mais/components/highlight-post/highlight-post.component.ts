import { Component, OnInit, Input } from '@angular/core';
import { NoticiaModel } from 'src/app/models';

@Component({
    selector: 'app-highlight-post',
    templateUrl: './highlight-post.component.html',
    styleUrls: ['./highlight-post.component.scss']
})
export class HighlightPostComponent implements OnInit {
    @Input() post: NoticiaModel = new NoticiaModel({});

    constructor() { }

    ngOnInit() {
    }

}
