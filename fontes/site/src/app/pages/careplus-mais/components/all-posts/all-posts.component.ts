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
    @Input() loading: boolean = false;
    @Output() loadMore: EventEmitter<void> = new EventEmitter<void>();
    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.posts) {
            this.posts = changes.posts.currentValue;
        }

        if (changes.allPostsLoaded) {
            this.allPostsLoaded = changes.allPostsLoaded.currentValue;
        }

        if (changes.loading) {
            this.loading = changes.loading.currentValue;
        }
    }

}
