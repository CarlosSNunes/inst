import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { BreadcrumbModel, NoticiaModel, IconCardsSectionModel, PostCardModel, RouteModel, ButtonModel } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { WindowRef } from 'src/utils/window-ref';
import { BlogService, EventEmitterService } from 'src/app/services';
import { environment } from 'src/environments/environment';
import { ErrorHandler } from 'src/utils/error-handler';

@Component({
    selector: 'app-detalhe-do-post',
    templateUrl: './detalhe-do-post.component.html',
    styleUrls: ['./detalhe-do-post.component.scss']
})
export class DetalheDoPostComponent implements OnInit {
    breadcrumbs: BreadcrumbModel[] = [];
    slug: string = '';
    post: NoticiaModel = new NoticiaModel({});
    iconCardsSectionModel: IconCardsSectionModel<PostCardModel> = new IconCardsSectionModel<PostCardModel>({
        smallTitle: 'Artigos  Relacionados',
        bigTitle: 'Fique por dentro dos conteúdos mais recentes',
        cards: [],
        columnClass: 'is-3-desktop',
        cendered: false
    });
    pageURL: string;
    constructor(
        private activatedRoute: ActivatedRoute,
        private title: Title,
        private meta: Meta,
        @Inject(PLATFORM_ID) private platformId: Object,
        private windowRef: WindowRef,
        private blogService: BlogService,
        private cdr: ChangeDetectorRef,
        private errorHandler: ErrorHandler,
        private router: Router
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.pageURL = this.windowRef.nativeWindow.location.href;
        }
        this.activatedRoute.params.subscribe(params => this.refreshData(params.slug));
    }

    async ngOnInit() {
        const slug = this.activatedRoute.snapshot.paramMap.get('slug')
        await this.refreshData(slug);
    }

    private async refreshData(slug?: string) {
        if (this.slug != slug) {
            this.slug = slug
            this.breadcrumbs = [
                new BreadcrumbModel({
                    name: 'Home',
                    link: '/home'
                }),
                new BreadcrumbModel({
                    name: 'Care Plus +',
                    link: '/careplus-mais'
                }),
            ];
            await this.getPostBySlug();

            this.breadcrumbs.push(
                new BreadcrumbModel({
                    name: this.post.titulo,
                    link: `/careplus-mais/${this.post.slug}`,
                    active: true
                })
            );
            this.setSEOInfos();
        }
    }

    private async getPostBySlug() {
        try {
            const apiPost = await this.blogService.getPostBySlug(this.slug);
            this.post = new NoticiaModel({
                ...apiPost,
                getDateDifferences: true,
            });
            this.getRelatedPosts(apiPost);
            this.cdr.detectChanges();
        } catch (error) {
            this.errorHandler.ShowError(error.error);
            this.router.navigate(['/404'])
        }
    }

    async getRelatedPosts(post: NoticiaModel) {
        try {
            const paginatedPosts = await this.blogService.getRelatedPosts(post, 0, 4);
            paginatedPosts.result.forEach(post => {
                this.iconCardsSectionModel.cards.push(new PostCardModel(
                    {
                        post,
                        button: new ButtonModel({
                            text: 'Ler artigo',
                            routerLink: `/careplus-mais/${post.slug}`
                        })
                    }
                ));
            });
        } catch (error) {
            this.errorHandler.ShowError(error.error)
        }
    }


    private setSEOInfos() {

        this.title.setTitle(`${this.post.tituloPaginaSEO} | Care Plus +`);
        this.meta.updateTag({
            name: 'description',
            content: this.post.descricaoPaginaSEO
        });

        EventEmitterService.get<RouteModel>('custouRoute').emit(new RouteModel({
            description: `${this.post.titulo} - Care Plus +`
        }))

        // Twitter
        this.meta.updateTag({ name: 'twitter:title', content: `${this.post.tituloPaginaSEO} | Care Plus +` });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

        this.meta.updateTag({ name: 'twitter:image', content: `${this.post.caminhoCompleto}?${new Date().getTime()}` });
        this.meta.updateTag({ name: 'twitter:description', content: this.post.descricaoPrevia });

        this.meta.updateTag({ name: 'twitter:url', content: `${environment.SELF_URL}/careplus-mais/${this.post.slug}` });

        // Facebook e demais redes sociais
        this.meta.updateTag({ name: 'og:title', content: `${this.post.tituloPaginaSEO} | Care Plus +` });
        this.meta.updateTag({ name: 'og:type', content: 'website' });
        this.meta.updateTag({ name: 'og:image', content: this.post.caminhoCompleto });
        this.meta.updateTag({ name: 'og:description', content: this.post.descricaoPrevia });

        this.meta.updateTag({ name: 'og:url', content: `${environment.SELF_URL}/careplus-mais/${this.post.slug}` });

        // Imagem linkedin
        this.meta.updateTag({ name: 'image', property: 'og:image', content: this.post.caminhoCompleto });

    }

}
