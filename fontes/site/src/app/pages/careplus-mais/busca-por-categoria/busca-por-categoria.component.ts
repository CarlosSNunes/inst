import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreadcrumbModel, RouteModel, NoticiaModel, CategoryModel } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService, NotificationService } from 'src/app/services';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { WindowRef } from 'src/utils/window-ref';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';

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

    constructor(
        private activatedRoute: ActivatedRoute,
        private notificationService: NotificationService,
        private title: Title,
        private meta: Meta,
        private router: Router,
        private windowRef: WindowRef,
        private categoriasService: CategoriasService,
        private blogService: BlogService,
        private cdr: ChangeDetectorRef
    ) {
        this.activatedRoute.params.subscribe(async params => {
            this.resetData();
            this.filterPosts(params);
        });
        EventEmitterService.get<RouteModel>('custouRoute').emit(new RouteModel({
            description: 'Resultado de busca - Care Plus +'
        }));
    }

    ngOnInit() {
    }

    private resetData() {
        this.breadcrumbs = [];
        this.term = '';
        this.categoryId = undefined;
        this.resultsCountMessage = '';
        this.count = 0;
        this.posts = [];
        this.category = undefined;
        this.categories = [];
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
        await this.getPostsByCaregoryId();
        await this.getCategories();
        this.loading = false;
        this.cdr.detectChanges();
    }

    private async getCategoryById(categoryId: number) {
        try {
            this.category = await this.categoriasService.getById(categoryId);
            this.setSEOInfos(this.category);
        } catch (error) {
            this.notificationService.addNotification('error', error.message);
        }
    }

    private async getCategories() {
        try {
            this.categories = await this.categoriasService.getAll();
        } catch (error) {
            this.notificationService.addNotification('error', error.message);
        }
    }

    private async getPostsByCaregoryId() {
        try {
            this.posts = await this.blogService.getByCategoryId(this.categoryId);
            this.count = this.posts.length;
            if (this.posts.length > 0) {
                this.resultsCountMessage = `Encontramos ${this.count} resultados para esta categoria`;
            } else {
                this.resultsCountMessage = 'Não encontramos resultados para esta categoria';
            }
        } catch (error) {
            this.notificationService.addNotification('error', error.message);
        }
    }

    setSEOInfos(category: CategoryModel) {
        this.title.setTitle(`Caregoria | ${category.titulo} | Care Plus +`);
        this.meta.updateTag({
            name: 'description',
            content: ''
        })
    }

    goToPostMobile(post: NoticiaModel) {
        if (this.windowRef.nativeWindow.innerWidth < 1024) {

            // TODO está sem slug atualmente, não foi contemplado nas tarefas do backend
            this.router.navigate(['/careplus-mais', post.id])
        }
    }

}
