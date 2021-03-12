import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { PostBlogUpdateModel } from 'src/models/posts-blog/posts-blog-update-model';
import { PostBlogModel } from 'src/models/posts-blog/posts-blog.model';
import { PostsBlogService } from '../posts-blog.service';

@Component({
    selector: 'app-post-preview',
    templateUrl: './post-preview.component.html',
    styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {
    slug: string = '';
    post: PostBlogUpdateModel;
    pageURL: string = '';
    constructor(
        private activatedRoute: ActivatedRoute,
        private postBlogService: PostsBlogService,
        private toastrService: ToastrService
    ) {
        this.activatedRoute.params.subscribe(params => this.refreshData(params.slug));
    }

    async ngOnInit() {

    }

    private async refreshData(slug?: string) {
        if (this.slug != slug) {
            this.slug = slug
            await this.getPostBySlug();
        }
    }

    private async getPostBySlug() {
        try {
            const apiPost = await this.postBlogService.getBySlug(this.slug).toPromise();
            this.pageURL = `${environment.INSTITUCIONAL_URL}/careplus-mais/${apiPost.slug}`;
            this.post = new PostBlogUpdateModel({
                ...apiPost,
                getDateDifferences: true,
            });
        } catch (error) {
            let message = '';
            if (error.error) {
                message = error.error.message || 'Erro Interno no servidor';
            } else {
                message = error.message || 'Erro Interno';
            }
            this.toastrService.error(message);
        }
    }

}
