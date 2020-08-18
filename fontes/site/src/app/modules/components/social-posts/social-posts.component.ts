import { Component, OnInit, Input } from '@angular/core';
import { InstagramPostModel } from 'src/app/models';
import { postsMock } from './data/posts';
import { InstagramService } from 'src/app/services';

@Component({
    selector: 'app-social-posts',
    templateUrl: './social-posts.component.html',
    styleUrls: ['./social-posts.component.scss']
})
export class SocialPostsComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    posts: InstagramPostModel[] = [];
    constructor(
        private instagramService: InstagramService,
    ) { }

    ngOnInit() {
        this.mockPosts()
    }

    mockPosts() {
        this.posts = postsMock;
    }

    async getPosts() {
        try {
            const posts = await this.instagramService.getPosts();
        } catch (error) {
            console.log(error)
        }
    }

}
