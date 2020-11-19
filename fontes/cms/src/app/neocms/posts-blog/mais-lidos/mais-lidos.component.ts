import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostBlogModel } from 'src/models/posts-blog/posts-blog.model';
import { MaisLidosService } from './mais-lidos.service';

@Component({
    selector: 'app-mais-lidos',
    templateUrl: './mais-lidos.component.html',
    styleUrls: ['./mais-lidos.component.scss']
})
export class MaisLidosComponent implements OnInit {
    posts: PostBlogModel[] = [];
    count: number = 0;
    loaded: boolean;
    post: PostBlogModel
    paginaAtual: number = 1;
    contador: number = 5;

    constructor(
        private maisLidosService: MaisLidosService,
        private toastrService: ToastrService
    ) { }

    ngOnInit() {
        this.getMaisLidos();
    }

    getMaisLidos() {
        const offset = (this.paginaAtual - 1) * this.contador;
        this.maisLidosService
            .getPaginated(offset, this.contador)
            .subscribe(
                posts => {
                    this.loaded = true;
                    this.posts = posts.result;
                    this.count = posts.count;
                },
                error => {
                    let message = '';
                    if (error.error) {
                        message = error.error.message || 'Erro Interno no servidor';
                    } else {
                        message = error.message || 'Erro Interno';
                    }
                    this.toastrService.error(message);
                    this.loaded = true;
                }
            );
    }

    onPageChange(page: number) {
        this.paginaAtual = page;
        this.getMaisLidos();
    }
}
