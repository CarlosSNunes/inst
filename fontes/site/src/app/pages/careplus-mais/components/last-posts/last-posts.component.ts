import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { PostCardModel } from 'src/app/models';

@Component({
    selector: 'app-last-posts',
    templateUrl: './last-posts.component.html',
    styleUrls: ['./last-posts.component.scss']
})
export class LastPostsComponent implements OnInit {
    @Input() posts: PostCardModel[] = [];

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.posts = changes.posts.currentValue;
    }

}
