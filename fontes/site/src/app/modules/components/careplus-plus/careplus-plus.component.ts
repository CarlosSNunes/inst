import { Component, OnInit, Input, ErrorHandler } from '@angular/core';
import { ButtonModel, NoticiaModel, PostCardModel } from 'src/app/models';
import { BlogService } from 'src/app/services';

@Component({
    selector: 'app-careplus-plus',
    templateUrl: './careplus-plus.component.html',
    styleUrls: ['./careplus-plus.component.scss']
})
export class CareplusPlusComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    @Input() title: string = '+ Saúde com + Informação: aproveite todos os nossos conteúdos sobre saúde e bem-estar';
    posts: PostCardModel[] = [];
    constructor(
        private blogService: BlogService,
        private errorHandler: ErrorHandler
    ) { }

    async ngOnInit() {
        await this.getLastPosts();
    }

    private async getLastPosts() {
        try {
            const posts = await this.blogService.getLastPosts();
            posts.slice(0, 4).forEach(post => {
                this.posts.push(
                    new PostCardModel({
                        post: new NoticiaModel(post),
                        button: new ButtonModel({
                            routerLink: `/careplus-mais/${post.id}`,
                            text: 'Ler artigo'
                        })
                    }))
            })
        } catch (error) {
            this.errorHandler.handleError(error.error);
        }
    }

}
