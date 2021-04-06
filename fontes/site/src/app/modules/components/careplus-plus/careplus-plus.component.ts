import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ButtonModel, NoticiaModel, PostCardModel } from 'src/app/models';
import { BlogService } from 'src/app/services';
import { ErrorHandler } from 'src/utils/error-handler';

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
        private errorHandler: ErrorHandler,
        private cdr: ChangeDetectorRef
    ) { }

    async ngOnInit() {
        await this.getLastPosts();
    }

    private async getLastPosts() {
        try {
            const { result } = await this.blogService.getAllPostsPaginated(0, 4);
            result.forEach(post => {
                this.posts.push(
                    new PostCardModel({
                        post: new NoticiaModel(post),
                        button: new ButtonModel({
                            routerLink: `/careplus-mais/${post.slug}`,
                            text: 'Ler artigo'
                        })
                    }))
            });
            this.cdr.detectChanges();
        } catch (error) {
            this.errorHandler.ShowError(error.error);
        }
    }

}
