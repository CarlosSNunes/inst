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
    canFindMore: boolean = true;
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
        EventEmitterService.get<RouteModel>('custouRoute').emit(new RouteModel({
            description: 'Resultado de busca - Care Plus +'
        }));
        this.isBrowser = isPlatformBrowser(this.platformId);
        this.setSEOInfos();
        String.prototype['replaceAt'] = function (index, char) {
            return this.substr(0, index) + char + this.substr(index + char.length);
        }
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.filterPosts(params);
        });
    }

    ngAfterViewInit() {
        if (this.isBrowser) {
            fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(200)).subscribe(() => {
                if (this.filterForm.controls.search.value != this.term) {
                    this.filter();
                }
            })
        }
    }

    omitSpecialCharacters(event) {
        var k;
        k = event.charCode;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }

    removeSpecialCharacters(characters) {
        for (let i = 0; i <= characters.length; i++) {
            const k = characters.charCodeAt(i);
            const invalid = ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57))
            if (invalid) {
                characters.replaceAt(i, '');
            }
        }
        return characters
    }

    private filterPosts(params) {
        if (!params.term || params.term == null) {
            this.term = ''
        } else {
            this.term = this.removeSpecialCharacters(params.term);
        }

        this.filterForm = this.fb.group({
            search: [this.term,],
        });

        this.filterForm.controls.search.setValue(this.term);

        this.breadcrumbs.push(
            new BreadcrumbModel({
                name: 'Resultado de Busca',
                link: `/careplus-mais/resultado-de-busca/${this.term}`,
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
            content: 'A Care Plus é uma operadora premium de saúde que oferece Plano de Saúde e Odontológico, Clínicas Odontológicas e Médicas, além de Medicina Ocupacional.'
        });
    }

    filter() {
        this.skip = 0;
        this.term = this.filterForm.controls.search.value;
        this.canFindMore = true;
        if (this.term && this.term != null && this.term.length > 0) {
            this.getPostsByTerm(true);
        } else {
            this.getAllPosts(true);
        }
    }

    onScroll() {
        if (this.canFindMore && this.term && !this.loading) {
            this.skip += this.take;
            this.getPostsByTerm();
        } else if (this.canFindMore && !this.loading) {
            this.skip += this.take;
            this.getAllPosts()
        }
    }

    goToPostMobile(post: NoticiaModel) {
        if (this.windowRef.nativeWindow.innerWidth < 1024) {
            this.router.navigate(['/careplus-mais', post.slug])
        }
    }

}
