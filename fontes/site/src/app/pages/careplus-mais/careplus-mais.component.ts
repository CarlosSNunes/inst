import { Component, OnInit } from '@angular/core';
import { BannerModel, CategoryModel, PostCardModel, NoticiaModel, ButtonModel } from 'src/app/models';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { Title, Meta } from '@angular/platform-browser';
import Banners from './data/banner';
import { extra } from './data/all-posts';
import { crossContentModel, breadcrumbs } from './data/mock';
import { BlogService } from 'src/app/services';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
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
    }

    private async getLastPosts() {
        try {
            const lastPosts = await this.blogService.getLastPosts();
            this.filterHighlightPost(lastPosts);
            this.filterRecentPosts(lastPosts);
        } catch (error) {
            this.errorHandler.ShowError(error.error);
        }
    }

    private filterHighlightPost(lastPosts: NoticiaModel[]) {
        const highlight = lastPosts.find(post => post.destaque == 1);
        if (highlight) {
            this.highLightPost = new NoticiaModel(highlight);
        }
    }

    private filterRecentPosts(lastPosts: NoticiaModel[]) {
        this.recentPosts = lastPosts.map(post => {
            if (post.destaque == 0) {
                // TODO está sem slug atualmente, não foi contemplado nas tarefas do backend
                return new PostCardModel({
                    post: new NoticiaModel(post),
                    button: new ButtonModel({
                        text: 'Ler artigo',
                        routerLink: `/careplus-mais/${post.id}`
                    })
                })
            } else {
                return null
            }
        }).filter(post => post != null)
    }

    private async getAllCategories() {
        this.categories = [];
        try {
            const categories = await this.categoriasService.getAll();
            categories.forEach(category => this.categories.push(category));
        } catch (error) {
            this.errorHandler.ShowError(error.error);
        }
    }

    getErrors(control: AbstractControl) {
        return FormControlError.GetErrors(control);
    }

    get form() {
        return this.filterForm.controls;
    }

    filter() {
        this.router.navigate(['/careplus-mais/busca', this.filterForm.value.search])
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
            extra.forEach(ex => {
                ex.isNewRequest = true;
                this.allPosts.push(ex)
            });
            this.allPostsLoaded = true;
        }
    }

}
