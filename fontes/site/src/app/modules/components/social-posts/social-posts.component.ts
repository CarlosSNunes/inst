import { Component, OnInit, Input, HostListener } from '@angular/core';
import { InstagramPostModel } from 'src/app/models';
import { postsMock } from './data/posts';

@Component({
    selector: 'app-social-posts',
    templateUrl: './social-posts.component.html',
    styleUrls: ['./social-posts.component.scss']
})
export class SocialPostsComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    @Input() htag: string = 'h5';
    posts: InstagramPostModel[] = [];
    public getScreenWidth: any;
    constructor() { }

    ngOnInit() {
        this.mockPosts()
        this.onWindowResize();
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize() {
        this.getScreenWidth = window.innerWidth;
    }

    mockPosts() {
        this.posts = postsMock;
    }

}
