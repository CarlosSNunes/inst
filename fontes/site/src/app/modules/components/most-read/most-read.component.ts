import { ChangeDetectorRef, Component, ErrorHandler, OnInit } from '@angular/core';
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
        private errorHandler: ErrorHandler,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.getMostReadPosts();
    }

    async getMostReadPosts() {
        try {
            this.posts = (await this.blogService.getMostRead()).map(post => new NoticiaModel(post));
            this.cdr.detectChanges();
        } catch (error) {
            this.errorHandler.handleError(error);
        }

    }

}
