import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { BreadcrumbModel, RouteModel, NoticiaModel } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService, EventEmitterService, BlogService } from 'src/app/services';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { WindowRef } from 'src/utils/window-ref';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-busca',
    templateUrl: './busca.component.html',
    styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit, AfterViewInit {
    @ViewChild('searchInput', { static: false }) searchInput: ElementRef<HTMLInputElement>;
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            name: 'Home',
            link: '/home'
        }),
        new BreadcrumbModel({
            name: 'Care Plus +',
            link: '/careplus-mais'
        })
    ];
    term: string = '';
    resultsCountMessage: string = '';
    count: number = 0;
    posts: NoticiaModel[] = [];
    filterForm: FormGroup;
    skip: number = 0;
    take: number = 20;
    canFindMore: boolean = false;
    isBrowser: boolean = false;
    loading: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private notificationService: NotificationService,
        private fb: FormBuilder,
        private title: Title,
        private meta: Meta,
        private router: Router,
        private windowRef: WindowRef,
        private blogService: BlogService,
        private cdr: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Platform
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        EventEmitterService.get<RouteModel>('custouRoute').emit(new RouteModel({
            description: 'Resultado de busca - Care Plus +'
        }));
        this.setSEOInfos();
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.filterPosts(params);
        });
    }

    ngAfterViewInit() {
        if (this.isBrowser) {
            fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(200)).subscribe(() => {
                this.filter();
            })
        }
    }

    private filterPosts(params) {
        this.term = params.term;
        this.filterForm = this.fb.group({
            search: [this.term,],
        });
        this.breadcrumbs.push(
            new BreadcrumbModel({
                name: 'Resultado de busca',
                link: `/careplus-mais/busca/${this.term}`,
                active: true
            })
        );

        if (this.term) {
            this.getPostsByTerm(true);
        } else {
            this.getAllPosts(true);
        }
    }


    get form() {
        return this.filterForm.controls;
    }

    async getPostsByTerm(newRequest: boolean = false) {
        this.loading = true;
        if (newRequest) {
            this.posts = [];
        }

        try {
            this.cdr.detectChanges();
            const { count, result } = await this.blogService.getPaginatedByTerm(this.skip, this.take, this.term);
            this.count = count;

            if (result.length < this.take) {
                this.canFindMore = false
            }

            result.forEach(post => this.posts.push(new NoticiaModel(post)));
            if (this.posts.length > 0) {
                this.resultsCountMessage = `Encontramos ${this.count} termos de resultado(s) para a sua busca`;
            } else {
                this.resultsCountMessage = 'Não encontramos resultados para a sua busca';
            }
            this.loading = false;
            this.cdr.detectChanges();
        } catch (error) {
            this.count = 0;
            this.posts = [];
            this.resultsCountMessage = 'Não encontramos resultados para a sua busca';
            this.loading = false;
            this.notificationService.addNotification('error', error.message);
            this.cdr.detectChanges();
        }
    }

    private async getAllPosts(newRequest: boolean = false) {
        this.loading = true;
        if (newRequest) {
            this.posts = [];
        }

        try {
            this.cdr.detectChanges();
            const { count, result } = await this.blogService.getAllPostsPaginated(this.skip, this.take);

            if (result.length < this.take) {
                this.canFindMore = false
            }

            this.count = count;
            result.forEach(post => this.posts.push(new NoticiaModel(post)));
            if (this.posts.length > 0) {
                this.resultsCountMessage = `Encontramos ${this.count} resultado(s).`;
            } else {
                this.resultsCountMessage = 'Não encontramos resultados.';
            }
            this.loading = false;
            this.cdr.detectChanges();
        } catch (error) {
            this.count = 0;
            this.posts = [];
            this.resultsCountMessage = 'Não encontramos resultados.';
            this.loading = false;
            this.notificationService.addNotification('error', error.message);
            this.cdr.detectChanges();
        }
    }

    // TODO falta meta description
    private setSEOInfos() {
        this.title.setTitle('Resultado de busca | Care Plus +');
        this.meta.updateTag({
            name: 'description',
            content: ''
        })
    }

    filter() {
        this.skip = 0;
        this.term = this.filterForm.value.search;
        this.canFindMore = true;
        if (this.term && this.term != null && this.term.length > 0) {
            this.getPostsByTerm(true);
        } else {
            this.getAllPosts(true);
        }
    }

    onScroll() {
        if (this.canFindMore && this.term) {
            this.skip += this.take;
            this.getPostsByTerm();
        } else if (this.canFindMore) {
            this.getAllPosts()
        }
    }

    goToPostMobile(post: NoticiaModel) {
        if (this.windowRef.nativeWindow.innerWidth < 1024) {
            this.router.navigate(['/careplus-mais', post.slug])
        }
    }

}
