import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { BreadcrumbModel, NoticiaModel, IconCardsSectionModel, PostCardModel, RouteModel } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import RelatedPosts from './data/related-posts';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { WindowRef } from 'src/utils/window-ref';
import { BlogService, NotificationService, EventEmitterService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-detalhe-do-post',
    templateUrl: './detalhe-do-post.component.html',
    styleUrls: ['./detalhe-do-post.component.scss']
})
export class DetalheDoPostComponent implements OnInit {
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            name: 'Home',
            link: '/home'
        }),
        new BreadcrumbModel({
            name: 'Care Plus +',
            link: '/careplus-mais'
        }),
    ];
    slug: string = '';
    post: NoticiaModel = new NoticiaModel({});
    iconCardsSectionModel: IconCardsSectionModel<PostCardModel> = new IconCardsSectionModel<PostCardModel>({
        smallTitle: 'Artigos  Relacionados',
        bigTitle: 'Fique por dentro dos conteúdos mais recentes',
        cards: RelatedPosts,
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
        private notificationService: NotificationService,
        private cdr: ChangeDetectorRef
    ) {
        this.activatedRoute.params.subscribe(async params => {
            this.slug = params.slug;
            await this.getPostBySlug();

            this.breadcrumbs.push(
                new BreadcrumbModel({
                    name: this.post.titulo,
                    link: `/careplus-mais/${this.post.slug}`,
                    active: true
                })
            );
            this.setSEOInfos();
        });
        if (isPlatformBrowser(this.platformId)) {
            this.pageURL = this.windowRef.nativeWindow.location.href;
        }
    }

    ngOnInit() {
    }

    private async getPostBySlug() {
        try {
            const apiPost = await this.blogService.getPostBySlug(this.slug);
            this.post = new NoticiaModel({
                ...apiPost,
                getDateDifferences: true,
            });
            this.cdr.detectChanges();
        } catch (error) {
            this.notificationService.addNotification('error', error.message);
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

        this.meta.updateTag({ name: 'twitter:image', content: `${this.post.caminhoImagem}?${new Date().getTime()}` });
        this.meta.updateTag({ name: 'twitter:description', content: this.post.descricaoPrevia });

        this.meta.updateTag({ name: 'twitter:url', content: `${environment.SELF_URL}careplus-mais/${this.post.slug}` });

        // Facebook e demais redes sociais
        this.meta.updateTag({ property: 'og:title', content: `${this.post.tituloPaginaSEO} | Care Plus +` });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ property: 'og:image', content: this.post.caminhoImagem });
        this.meta.updateTag({ property: 'og:description', content: this.post.descricaoPrevia });

        this.meta.updateTag({ property: 'og:url', content: `${environment.SELF_URL}careplus-mais/${this.post.slug}` });

        // Imagem linkedin
        this.meta.updateTag({ name: 'image', property: 'og:image', content: this.post.caminhoImagem });

    }

}
