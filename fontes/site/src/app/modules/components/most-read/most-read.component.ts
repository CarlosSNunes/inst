import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services';
import { NoticiaModel } from 'src/app/models';
import { ErrorHandler } from 'src/utils/error-handler';

@Component({
    selector: 'app-most-read',
    templateUrl: './most-read.component.html',
    styleUrls: ['./most-read.component.scss']
})
export class MostReadComponent implements OnInit {
    posts: NoticiaModel[] = [];
    skip: number = 0;
    take: number = 4;
    constructor(
        private blogService: BlogService,
        private errorHandler: ErrorHandler,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.getMostReadPosts();
    }

    async getMostReadPosts() {
        try {
            const mostReadPosts = await this.blogService.getMostRead(this.skip, this.take);
            mostReadPosts.result.forEach(post => {
                this.posts.push(new NoticiaModel(post))
            });
            this.cdr.detectChanges();
        } catch (error) {
            this.errorHandler.ShowError(error);
        }

    }

}
