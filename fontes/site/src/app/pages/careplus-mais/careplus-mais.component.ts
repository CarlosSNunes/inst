import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BannerModel, CategoryModel, PostCardModel, NoticiaModel, ButtonModel } from 'src/app/models';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { Title, Meta } from '@angular/platform-browser';
import Banners from './data/banners';
import { crossContentModel, breadcrumbs } from './data/mock';
import { BlogService, CategoriasService } from 'src/app/services';
import { Router } from '@angular/router';
import { ErrorHandler } from 'src/utils/error-handler';
import { environment } from 'src/environments/environment';


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
    allPostsSkip: number = 7;
    allPostsTake: number = 9;

    constructor(
        private fb: FormBuilder,
        private title: Title,
        private meta: Meta,
        private blogService: BlogService,
        private router: Router,
        private categoriasService: CategoriasService,
        private errorHandler: ErrorHandler,
        private cdr: ChangeDetectorRef
    ) {
        this.setSEOInfos();
        this.filterForm = this.fb.group({
            search: ['',],
            categoryId: [0,]
        });
    }

    ngOnInit() {
        this.getAllCategoriesPaginated();
        this.getLastPosts();
        this.getAllPosts();
    }

    private async getLastPosts() {
        try {
            const lastPosts = await this.blogService.getLastPosts();
            this.filterHighlightPost(lastPosts.result);
            this.filterRecentPosts(lastPosts.result);
            this.cdr.detectChanges();
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
            this.cdr.detectChanges();
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
        this.cdr.detectChanges();
    }

    private async getAllPosts(newRequest: boolean = false) {
        try {
            const allPostsPaginated = await this.blogService.getAllPostsPaginated(this.allPostsSkip, this.allPostsTake);
            allPostsPaginated.result.forEach(post => {
                let postCardObj = new PostCardModel({
                    post,
                    button: new ButtonModel({
                        text: 'Ler artigo',
                        routerLink: `/careplus-mais/${post.slug}`
                    })
                });
                if (newRequest) {
                    postCardObj.isNewRequest = true;
                }
                this.allPosts.push(postCardObj);
            });
            if (this.allPosts.length === allPostsPaginated.count || allPostsPaginated.result.length < this.allPostsTake) {
                this.allPostsLoaded = true;
            }
            this.cdr.detectChanges();
        } catch (error) {
            this.errorHandler.ShowError(error);
        }
    }

    private async getAllCategoriesPaginated() {
        this.categories = []
        try {
            const paginatedCategories = await this.categoriasService.getAllPaginated(0, 6);
            paginatedCategories.result.forEach(category => {
                this.categories.push(new CategoryModel(category));
            })
            this.cdr.detectChanges();
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

    omitSpecialCharacters(event) {
        var k;
        k = event.charCode;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
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

        /* 
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                'Care Plus +',
        });

        this.meta.updateTag({
            name: "og:type",
            content:
                "website",
        });

        // Observação, a meta tag og:image é preenchida no componente de banner.

        this.meta.updateTag({
            name: "og:description",
            content: 'O seu canal de notícias e conteúdos exclusivos no site da Care Plus.',
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/careplus-mais`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                'Care Plus +',
        });

        this.meta.updateTag({
            name: "twitter:card",
            content:
                "summary_large_image",
        });

        // Observação, a meta tag twitter:image é preenchida no componente de banner.

        this.meta.updateTag({
            name: "twitter:description",
            content: 'O seu canal de notícias e conteúdos exclusivos no site da Care Plus.'
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/careplus-mais`,
        });
    }

    loadMore() {
        if (!this.allPostsLoaded) {
            this.allPostsSkip += this.allPostsTake;
            this.getAllPosts(true);
        }
    }

}
