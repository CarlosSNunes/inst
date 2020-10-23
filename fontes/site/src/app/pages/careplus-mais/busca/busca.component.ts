import { Component, OnInit } from '@angular/core';
import { BreadcrumbModel, RouteModel, NoticiaModel } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { WindowRef } from 'src/utils/window-ref';

@Component({
    selector: 'app-busca',
    templateUrl: './busca.component.html',
    styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {
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

    constructor(
        private activatedRoute: ActivatedRoute,
        private notificationService: NotificationService,
        private fb: FormBuilder,
        private title: Title,
        private meta: Meta,
        private router: Router,
        private windowRef: WindowRef
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.filterPosts(params);
        });
        EventEmitterService.get<RouteModel>('custouRoute').emit(new RouteModel({
            description: 'Resultado de busca - Care Plus +'
        }));
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    private filterPosts(params) {
        this.term = params.term;
        this.filterForm = this.fb.group({
            search: [this.term,],
            categoryId: [0,]
        });
        this.breadcrumbs.push(
            new BreadcrumbModel({
                name: 'Resultado de busca',
                link: `/careplus-mais/busca/${this.term}`,
                active: true
            })
        );

        this.getPostsByTerm();
    }


    get form() {
        return this.filterForm.controls;
    }

    async getPostsByTerm() {
        try {
            this.count = this.posts.length;
            if (this.posts.length > 0) {
                this.resultsCountMessage = `Encontramos ${this.posts.length} termos de resultados para a sua busca`;
            } else {
                this.resultsCountMessage = 'Não encontramos resultados para a sua busca';
            }
        } catch (error) {
            this.notificationService.addNotification('error', error.message);
        }
    }

    setSEOInfos() {
        this.title.setTitle('Resultado de busca | Care Plus +');
        this.meta.updateTag({
            name: 'description',
            content: ''
        })
    }

    filter() {

    }

    goToPostMobile(post: NoticiaModel) {
        if (this.windowRef.nativeWindow.innerWidth < 1024) {

            // TODO está sem slug atualmente, não foi contemplado nas tarefas do backend
            this.router.navigate(['/careplus-mais', post.id])
        }
    }

}
