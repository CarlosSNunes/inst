import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BreadcrumbModel, NoticiaModel, IconCardsSectionModel, PostCardModel, RouteModel } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import PostMock from './data/post-mock';
import RelatedPosts from './data/related-posts';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter-service.service';
import { WindowRef } from 'src/utils/window-ref';
import { BlogService, NotificationService } from 'src/app/services';
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
        private notificationService: NotificationService
    ) {
        this.activatedRoute.params.subscribe(async params => {
            this.slug = params.slug;
            await this.getPostBySlug();

            // TODO está sem slug atualmente, não foi contemplado nas tarefas do backend
            this.breadcrumbs.push(
                new BreadcrumbModel({
                    name: this.post.titulo,
                    link: `/careplus-mais/${this.post.id}`,
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

    // TODO chamar este endpoint e remover os mocks quando a api estiver pronta e publicada
    private async getPostBySlug() {
        try {
            this.post = await this.blogService.getPostBySlug(this.slug);
        } catch (error) {
            this.notificationService.addNotification('error', error.message);
        }
    }

    private setSEOInfos() {

        this.title.setTitle(`${this.post.titulo} | Care Plus +`);
        this.meta.updateTag({
            name: 'description',
            content: this.post.descricaoPrevia
        });

        EventEmitterService.get<RouteModel>('custouRoute').emit(new RouteModel({
            description: `${this.post.titulo} - Care Plus +`
        }))

        if (isPlatformServer(this.platformId)) {
            // Twitter
            this.meta.updateTag({ name: 'twitter:title', content: `${this.post.titulo} | Care Plus +` });
            this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

            this.meta.updateTag({ name: 'twitter:image', content: `${this.post.caminhoImagem}?${new Date().getTime()}` });
            this.meta.updateTag({ name: 'twitter:description', content: this.post.descricaoPrevia });

            // TODO está sem slug atualmente, não foi contemplado nas tarefas do backend
            this.meta.updateTag({ name: 'twitter:url', content: `${environment.SELF_URL}careplus-mais/${this.post.id}` });

            // Facebook e demais redes sociais
            this.meta.updateTag({ property: 'og:title', content: `${this.post.titulo} | Care Plus +` });
            this.meta.updateTag({ property: 'og:type', content: 'website' });
            this.meta.updateTag({ property: 'og:image', content: this.post.caminhoImagem });
            this.meta.updateTag({ property: 'og:description', content: this.post.descricaoPrevia });

            // TODO está sem slug atualmente, não foi contemplado nas tarefas do backend
            this.meta.updateTag({ property: 'og:url', content: `${environment.SELF_URL}careplus-mais/${this.post.id}` });

            // Imagem linkedin
            this.meta.updateTag({ name: 'image', property: 'og:image', content: this.post.caminhoImagem });

        }
    }

}
