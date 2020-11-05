import { Component, ErrorHandler, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services';
import { NoticiaModel, PostCardModel } from 'src/app/models';

@Component({
    selector: 'app-related-posts',
    templateUrl: './related-posts.component.html',
    styleUrls: ['./related-posts.component.scss']
})
export class RelatedPostsComponent implements OnInit {
    posts: PostCardModel[] = [];
    pagePost;
    page: number = 0;
    pageSize: number = 4;
    constructor(
        private blogService: BlogService,
        private errorHandler: ErrorHandler
    ) { }

    ngOnInit() {
        this.getRelatedPosts(this.pagePost);
    }


    async getRelatedPosts(_post: NoticiaModel) {
        try {
            const paginatedPosts = await this.blogService.getRelatedPosts(_post, this.page, this.pageSize);
            paginatedPosts.result.forEach(post => {
                this.posts.push(new PostCardModel(
                    {
                        post
                    }
                ));
            });
        } catch (error) {
            this.errorHandler.handleError(error.error)
        }
    }
}
