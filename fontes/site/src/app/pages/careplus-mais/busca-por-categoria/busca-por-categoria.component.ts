import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreadcrumbModel, RouteModel, NoticiaModel, CategoryModel } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService, NotificationService, EventEmitterService, CategoriasService } from 'src/app/services';
import { Title, Meta } from '@angular/platform-browser';
import { WindowRef } from 'src/utils/window-ref';

@Component({
    selector: 'app-busca-por-categoria',
    templateUrl: './busca-por-categoria.component.html',
    styleUrls: ['./busca-por-categoria.component.scss']
})
export class BuscaPorCategoriaComponent implements OnInit {
    breadcrumbs: BreadcrumbModel[] = [];
    term: string = '';
    categoryId: number;
    resultsCountMessage: string = '';
    count: number = 0;
    posts: NoticiaModel[] = [];
    category: CategoryModel;
    categories: CategoryModel[] = [];
    loading: boolean = false;
    skip: number = 0;
    take: number = 20;
    canFindMore: boolean = true;

    constructor(
        private activatedRoute: ActivatedRoute,
        private notificationService: NotificationService,
        private title: Title,
        private meta: Meta,
        private router: Router,
        private windowRef: WindowRef,
        private categoriasService: CategoriasService,
        private blogService: BlogService,
        private cdr: ChangeDetectorRef,
    ) {
        this.activatedRoute.params.subscribe(async params => {
            this.resetData();
            this.filterPosts(params);
        });
    }

    ngOnInit() {
        EventEmitterService.get<RouteModel>('custouRoute').emit(new RouteModel({
            description: 'Resultado de busca - Care Plus +'
        }));
    }

    private resetData() {
        this.breadcrumbs = [];
        this.term = '';
        this.categoryId = undefined;
        this.resultsCountMessage = '';
        this.count = 0;
        this.posts = [];
        this.category = undefined;
    }

    private async filterPosts(params) {
        this.loading = true;
        this.breadcrumbs = [
            new BreadcrumbModel({
                name: 'Home',
                link: '/home'
            }),
            new BreadcrumbModel({
                name: 'Care Plus +',
                link: '/careplus-mais'
            }),
            new BreadcrumbModel({
                name: 'Resultado de busca',
                link: `/careplus-mais/categoria/${this.categoryId}`,
                active: true
            })
        ];
        this.categoryId = params.categoryId;
        await this.getCategoryById(params.categoryId)
        await this.getPostsByCategoryId();
        await this.getAllCategoriesPaginated();
        this.cdr.detectChanges();
        this.loading = false;
    }

    private async getCategoryById(categoryId: number) {
        try {
            this.category = await this.categoriasService.getById(categoryId);
            this.setSEOInfos(this.category);
        } catch (error) {
            this.notificationService.addNotification('error', error.message);
        }
    }

    private async getAllCategoriesPaginated() {
        try {
            const categoriesPaginated = await this.categoriasService.getAllPaginated(0, 1000);
            this.categories = [];
            categoriesPaginated.result.forEach(category => {
                this.categories.push(new CategoryModel(category));
            });
        } catch (error) {
            this.notificationService.addNotification('error', error.message);
        }
    }

    private async getPostsByCategoryId() {
        this.loading = true;
        this.cdr.detectChanges();
        try {
            const { result, count } = await this.blogService.getByCategoryId(this.categoryId, this.skip, this.take);
            this.count = count;
            if (count == 0 || result.length < this.take) {
                this.canFindMore = false;
            }
            result.forEach(post => {
                this.posts.push(new NoticiaModel(post))
            });
            if (this.count > 0) {
                this.resultsCountMessage = `Encontramos ${this.count} resultados para esta categoria`;
            } else {
                this.resultsCountMessage = 'Não encontramos resultados para esta categoria';
            }
            this.loading = false;
            this.cdr.detectChanges();
        } catch (error) {
            this.count = 0;
            this.posts = [];
            this.resultsCountMessage = 'Não encontramos resultados para esta categoria';
            this.loading = false;
            this.notificationService.addNotification('error', error.message);
            this.cdr.detectChanges();
        }
    }

    onScroll() {
        if (this.canFindMore) {
            this.skip += this.take;
            this.getPostsByCategoryId()
        }
    }

    // TODO falta meta description
    setSEOInfos(category: CategoryModel) {
        this.title.setTitle(`Categoria | ${category.titulo} | Care Plus +`);
        this.meta.updateTag({
            name: 'description',
            content: ''
        })
    }

    goToPostMobile(post: NoticiaModel) {
        if (this.windowRef.nativeWindow.innerWidth < 1024) {

            this.router.navigate(['/careplus-mais', post.slug])
        }
    }

}
