import { Component, OnInit, TemplateRef } from '@angular/core';
import { faEdit, faTrashAlt, faEye, faClone, faStar } from '@fortawesome/free-solid-svg-icons';
import { PostBlogModel } from 'src/models/posts-blog/posts-blog.model';
import { PostsBlogService } from './posts-blog.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-posts-blog',
    templateUrl: './posts-blog.component.html',
    styleUrls: ['./posts-blog.component.scss']
})
export class PostsBlogComponent implements OnInit {
    postsBlog: PostBlogModel[] = [];
    faEdit = faEdit;
    faTrashAlt = faTrashAlt;
    faEye = faEye;
    faClone = faClone;
    faStar = faStar;
    loaded: boolean;
    postBlog: PostBlogModel;
    usuario: UserAuthenticateModel;
    bsModalRef: BsModalRef;
    postCount: number = 0;
    paginaAtual = 1;
    contador = 5;
    userPermission: string;
    dataFilter: boolean = false;
    tituloFilter: boolean = false;
    catalogoFilter: boolean = false;



    private readonly API_ENDPOINT = environment.API;

    constructor(
        private postsBlogService: PostsBlogService,
        private authenticationService: AuthenticationService,
        private modalService: BsModalService,
        private toastrService: ToastrService
    ) {
        this.authenticationService.usuarioChanged.subscribe(usuario =>
            this.usuario = usuario
        );
    }

    ngOnInit() {
        this.userPermission = JSON.parse(localStorage.getItem('user_token')).perfis[0].descricao;

        this.usuario = this.authenticationService.state;
        this.getPosts();
    }

    getPosts() {
        const offset = (this.paginaAtual - 1) * this.contador;
        this.postsBlogService
            .getAll(offset, this.contador)
            .subscribe(postsBlog => {
                this.loaded = true;
                this.postsBlog = postsBlog.result
                this.postCount = postsBlog.count;
                console.log(this.postsBlog)
                this.filterPosts('data')
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
                });
    }

    private duplicarPost(slug) {
        this.postsBlogService.duplicate(slug)
            .subscribe(() => {
                this.toastrService.success('Post duplicado com sucesso!!!');
                this.getPosts();
                this.bsModalRef.hide();
            }, (error) => {
                let message = '';
                if (error.error) {
                    message = error.error.message || 'Erro Interno no servidor';
                } else {
                    message = error.message || 'Erro Interno';
                }
                this.bsModalRef.hide();
                this.toastrService.error(message);
            });
    }

    openModalDuplicarPost(template: TemplateRef<PostBlogModel>) {
        this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
    }

    confirmDuplicar(post: PostBlogModel): void {
        this.duplicarPost(post.slug);
    }

    confirmExcluir(post: PostBlogModel): void {
        this.postsBlogService.delete(post.slug)
            .subscribe(() => {
                this.toastrService.success('Post excluido com sucesso!!!');
                this.bsModalRef.hide();
                this.getPosts();
            }, (error) => {
                let message = '';
                if (error.error) {
                    message = error.error.message || 'Erro Interno no servidor';
                } else {
                    message = error.message || 'Erro Interno';
                }
                this.bsModalRef.hide();
                this.toastrService.error(message);
            });
    }

    decline(): void {
        this.bsModalRef.hide();
    }

    onPageChange(page: number) {
        this.paginaAtual = page;
        this.getPosts();
    }
    filterPosts(filter: string) {
        console.log(filter)
        switch (filter) {
            case 'data':
                if(this.dataFilter){
                    this.postsBlog.sort((a, b) => {
                        console.log(a.dataPublicacao, b.dataPublicacao)
                        if (new Date(a.dataPublicacao).getTime() > new Date(b.dataPublicacao).getTime()) {
                            return -1
                        }
                        if (new Date(a.dataPublicacao).getTime() < new Date(b.dataPublicacao).getTime()) {
                            return 1;
                        }
                        return 0;
                    })
                }else{
                    this.postsBlog.sort((a, b) => {
                        console.log(a.dataPublicacao, b.dataPublicacao)
                        if (new Date(a.dataPublicacao).getTime() > new Date(b.dataPublicacao).getTime()) {
                            return 1
                        }
                        if (new Date(a.dataPublicacao).getTime() < new Date(b.dataPublicacao).getTime()) {
                            return -1;
                        }
                        return 0;
                    })
                }
                this.dataFilter = !this.dataFilter
                break;
            case 'titulo':
                if(this.tituloFilter){
                    this.postsBlog.sort((a, b) => {
                        if (a.titulo > b.titulo) {
                            return -1
                        }
                        if (a.titulo < b.titulo)  {
                            return 1;
                        }
                        return 0;
                    })
                }else{
                    this.postsBlog.sort((a, b) => {
                        if (a.titulo > b.titulo) {
                            return 1
                        }
                        if (a.titulo < b.titulo) {
                            return -1;
                        }
                        return 0;
                    })
                }
                this.tituloFilter = !this.tituloFilter
                break;
            case 'categoria':
                if(this.catalogoFilter){
                    this.postsBlog.sort((a, b) => {
                        if (a.categoria > b.categoria) {
                            return -1
                        }
                        if (a.categoria < b.categoria) {
                            return 1;
                        }
                        return 0;
                    })
                }else{
                    this.postsBlog.sort((a, b) => {
                        if  (a.categoria > b.categoria) {
                            return 1
                        }
                        if  (a.categoria < b.categoria) {
                            return -1;
                        }
                        return 0;
                    })
                }
                this.catalogoFilter = !this.catalogoFilter
                break;
        }
    }

}
