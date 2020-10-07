import { Component, ErrorHandler, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services';
import { NoticiaModel } from 'src/app/models';

@Component({
    selector: 'app-most-read',
    templateUrl: './most-read.component.html',
    styleUrls: ['./most-read.component.scss']
})
export class MostReadComponent implements OnInit {
    posts: NoticiaModel[] = [];
    constructor(
        private blogService: BlogService,
        private errorHandler: ErrorHandler
    ) { }

    ngOnInit() {
        this.getMostReadPosts();
    }

    async getMostReadPosts() {
        try {
            this.posts = await this.blogService.getMostRead();
        } catch (error) {
            this.errorHandler.handleError(error);
        }

    }

}
