import { Component, OnInit } from '@angular/core';
import { BannerModel, BreadcrumbModel, CategoryModel, CrossContentModel, PostCardModel, ButtonModel } from 'src/app/models';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { Title, Meta } from '@angular/platform-browser';
import Banners from './data/banner';
import HighlightPost from './data/highlight';
import RecentPosts from './data/recent-posts';
import { all, extra } from './data/all-posts';
import { NotificationService, BlogService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-careplus-mais',
    templateUrl: './careplus-mais.component.html',
    styleUrls: ['./careplus-mais.component.scss']
})
export class CareplusMaisComponent implements OnInit {
    banners: BannerModel[] = Banners;
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            link: '/home',
            name: 'Home'
        }),
        new BreadcrumbModel({
            link: '/careplus-mais',
            name: 'Care Plus +',
            active: true
        })
    ];
    filterForm: FormGroup;
    selectCategoryId: number = 0;
    categories: CategoryModel[] = [
        new CategoryModel({
            name: 'Todos',
            slug: 'todos',
            id: 0
        }),
        new CategoryModel({
            name: 'Dicas de Saúde',
            slug: 'dicasDeSaude',
            id: 1
        }),
        new CategoryModel({
            name: 'Atividade Física',
            slug: 'atividadeFisica',
            id: 2
        }),
        new CategoryModel({
            name: 'Dicas Para o RH',
            slug: 'dicasParaORh',
            id: 3
        }),
        new CategoryModel({
            name: 'Planos de Saúde',
            slug: 'planosDeSaude',
            id: 4
        }),
        new CategoryModel({
            name: 'Nutrição',
            slug: 'nutricao',
            id: 5
        }),
        new CategoryModel({
            name: 'Outros',
            slug: 'outros',
            id: 6
        })
    ];
    highLightPost = HighlightPost;
    recentPosts = RecentPosts;
    allPosts = all;
    crossContentModel: CrossContentModel = new CrossContentModel({
        firstImage: {
            src: 'assets/img/blog-posts-cross-content-image-1-mock.jpg',
            alt: 'Serviços Online imagem 1'
        },
        secondImage: {
            src: 'assets/img/servicos-online.jpg',
            alt: 'Serviços Online imagem 2'
        },
        boxContent: {
            title: 'Voce conheçe os nossos serviços online?',
            description: 'Serviços à distância com qualidade, carinho e cuidado. Conheça os serviços que a Care Plus disponibilizar a distância para seus beneciários.',
            button: new ButtonModel({
                text: 'Saiba Mais',
                routerLink: '/gestao-de-saude/servicos-online'
            })
        }
    });
    allPostsLoaded: boolean = false;

    constructor(
        private fb: FormBuilder,
        private title: Title,
        private meta: Meta,
        private notificationService: NotificationService,
        private blogService: BlogService,
        private router: Router
    ) {
        this.setSEOInfos();
        this.filterForm = this.fb.group({
            search: ['',],
            categoryId: [0,]
        });
    }

    ngOnInit() {
    }

    // TODO chamar este endpoint e remover os mocks quando a api estiver pronta e publicada
    private async getLastPosts() {
        try {
            const lastPosts = await this.blogService.getLastPosts();
            this.highLightPost = lastPosts.find(post => post.destaque == 1);
            this.recentPosts = lastPosts.map(post => {
                if (post.destaque == 0) {
                    return new PostCardModel({
                        post
                    })
                } else {
                    return null
                }
            }).filter(post => post != null)

        } catch (error) {
            this.notificationService.addNotification('error', error.message);
        }
    }

    activeCategory(categoryId: number) {
        this.selectCategoryId = categoryId;
        this.filterForm.controls.categoryId.setValue(this.selectCategoryId)
        // this.filter()
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
            extra.map(ex => {
                ex['isNewRequest'] = true;
                this.allPosts.push(ex)
            });
            this.allPostsLoaded = true;
        }
    }

}
