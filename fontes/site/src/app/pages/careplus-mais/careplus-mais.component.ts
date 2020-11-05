import { Component, OnInit } from '@angular/core';
import { BannerModel, CategoryModel, PostCardModel, NoticiaModel, ButtonModel } from 'src/app/models';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { Title, Meta } from '@angular/platform-browser';
import Banners from './data/banner';
import { crossContentModel, breadcrumbs } from './data/mock';
import { BlogService, CategoriasService } from 'src/app/services';
import { Router } from '@angular/router';
import { ErrorHandler } from 'src/utils/error-handler';


@Component({
    selector: 'app-careplus-mais',
    templateUrl: './careplus-mais.component.html',
    styleUrls: ['./careplus-mais.component.scss']
})
export class CareplusMaisComponent implements OnInit {
    banners: BannerModel[] = Banners;
    breadcrumbs = breadcrumbs;
    filterForm: FormGroup;
    selectCategoryId: number = 0;
    categories: CategoryModel[] = [];
    highLightPost: NoticiaModel;
    recentPosts: PostCardModel[] = [];
    allPosts: PostCardModel[] = [];
    crossContentModel = crossContentModel;
    allPostsLoaded: boolean = false;
    page: number = 2;
    pageSize: number = 7;

    constructor(
        private fb: FormBuilder,
        private title: Title,
        private meta: Meta,
        private blogService: BlogService,
        private router: Router,
        private categoriasService: CategoriasService,
        private errorHandler: ErrorHandler
    ) {
        this.setSEOInfos();
        this.filterForm = this.fb.group({
            search: ['',],
            categoryId: [0,]
        });
    }

    ngOnInit() {
        this.getAllCategories();
        this.getLastPosts();
        this.getAllPosts();
    }

    private async getLastPosts() {
        try {
            const lastPosts = await this.blogService.getLastPosts();
            this.filterHighlightPost(lastPosts.result);
            this.filterRecentPosts(lastPosts.result);
        } catch (error) {
            this.errorHandler.ShowError(error);
        }
    }

    private filterHighlightPost(lastPosts: NoticiaModel[]) {
        const highlight = lastPosts.find(post => post.destaque == 1);
        if (highlight) {
            this.highLightPost = new NoticiaModel({
                ...highlight,
                getDateDifferences: true,
            });
        }
    }

    private filterRecentPosts(lastPosts: NoticiaModel[]) {
        this.recentPosts = lastPosts.map(post => {
            if (post.destaque == 0) {
                return new PostCardModel({
                    post: new NoticiaModel(post),
                    button: new ButtonModel({
                        text: 'Ler artigo',
                        routerLink: `/careplus-mais/${post.slug}`
                    })
                })
            } else {
                return null
            }
        }).filter(post => post != null)
    }

    private async getAllPosts(newRequest: boolean = false) {
        try {
            const allPostsPaginated = await this.blogService.getAllPostsPaginated(this.page, this.pageSize);
            allPostsPaginated.result.forEach(post => {
                let postCardObj = new PostCardModel({
                    post
                });
                if (newRequest) {
                    postCardObj.isNewRequest = true;
                }
                this.allPosts.push(postCardObj);
            });
            if (this.allPosts.length === allPostsPaginated.count) {
                this.allPostsLoaded = true;
            }
        } catch (error) {
            this.errorHandler.ShowError(error);
        }
    }

    private async getAllCategories() {
        this.categories = []
        try {
            const paginatedCategories = await this.categoriasService.getAll();
            paginatedCategories.result.forEach(category => {
                this.categories.push(new CategoryModel(category));
            })
        } catch (error) {
            this.errorHandler.ShowError(error);
        }
    }

    getErrors(control: AbstractControl) {
        return FormControlError.GetErrors(control);
    }

    get form() {
        return this.filterForm.controls;
    }

    filter() {
        if (this.filterForm.value.search && this.filterForm.value.search != null && this.filterForm.value.search.length > 0) {
            this.router.navigate(['/careplus-mais/busca', this.filterForm.value.search])
        }
    }

    setSEOInfos() {
        this.title.setTitle('Care Plus +');
        this.meta.updateTag({
            name: 'description',
            content: 'O seu canal de notícias e conteúdos exclusivos no site da Care Plus.'
        });
    }

    loadMore() {
        if (!this.allPostsLoaded) {
            this.getAllPosts(true);
        }
    }

}
