import { Component, OnInit } from '@angular/core';
import Posts from "./mock-post";
import { BlogService } from 'src/app/services';

@Component({
    selector: 'app-most-read',
    templateUrl: './most-read.component.html',
    styleUrls: ['./most-read.component.scss']
})
export class MostReadComponent implements OnInit {
    posts: {}[] = [];
    constructor(private blogService: BlogService) { }

    ngOnInit() {
        this.getMostReadPosts();
    }

    async getMostReadPosts() {
        try {
            //   this.posts = await this.blogService.getMostRead();
            this.posts = Posts.posts;
        } catch (err) {
            console.log(err)
            this.posts = Posts.posts;
        }

    }

}
