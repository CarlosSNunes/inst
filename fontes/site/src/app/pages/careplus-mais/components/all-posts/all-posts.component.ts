import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { PostCardModel } from 'src/app/models';

@Component({
    selector: 'app-all-posts',
    templateUrl: './all-posts.component.html',
    styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit, OnChanges {
    @Input() posts: PostCardModel[] = [];
    @Input() allPostsLoaded: boolean = false;
    @Output() loadMore: EventEmitter<void> = new EventEmitter<void>();
    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.posts = changes.posts.currentValue;
        this.allPostsLoaded = changes.allPostsLoaded.currentValue;
    }

}
