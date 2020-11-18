import { Component, OnInit, TemplateRef } from '@angular/core';
import { faEdit, faTrashAlt, faEye, faClone, faStar } from '@fortawesome/free-solid-svg-icons';
import { PostBlogModel } from 'src/models/posts-blog/posts-blog.model';
import { PostsBlogService } from './posts-blog.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { PostsBlogCreateModel } from 'src/models/posts-blog/posts-blog-create.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControlError } from 'src/utils/form-control-error';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-posts-blog',
    templateUrl: './posts-blog.component.html',
    styleUrls: ['./posts-blog.component.scss']
})
export class PostsBlogComponent implements OnInit {
    postsBlog: PostBlogModel[] = [];
    postsBlogForm: FormGroup;
    faEdit = faEdit;
    faTrashAlt = faTrashAlt;
    faEye = faEye;
    faClone = faClone;
    faStar = faStar;
    loaded: boolean;
    postBlog: PostBlogModel;
    usuario: UserAuthenticateModel;
    bsModalRef: BsModalRef;

    totalItems: number;
    paginaAtual = 1;
    contador = 5;

    private readonly API_ENDPOINT = environment.API;
    postCount: number;

    constructor(
        private postsBlogService: PostsBlogService,
        private authenticationService: AuthenticationService,
        private fb: FormBuilder,
        private modalService: BsModalService,
        private toastrService: ToastrService
    ) {
        this.authenticationService.usuarioChanged.subscribe(usuario =>
            this.usuario = usuario
        );
    }

    ngOnInit() {
        this.usuario = this.authenticationService.state;
        this.getPosts();
    }

    getPosts() {
        this.postsBlogService
            .getAll(0, 100)
            .subscribe(postsBlog => {
                this.loaded = true;
                this.postsBlog = postsBlog.result
                this.postCount = postsBlog['count'];
                this.totalItems = this.postCount;
            },
                error => {
                    this.loaded = true;
                });
    }

    private duplicarPost(post: PostBlogModel) {
        const postTags = post.postTag.map(postTag => ({ tagId: postTag.id }));

        const dataPublicacao = post.dataPublicacao && post.dataPublicacao != null ? new Date(post.dataPublicacao).toISOString().substring(0, 10) : undefined;

        const dataExpiracao = post.dataExpiracao && post.dataExpiracao != null ? new Date(post.dataExpiracao).toISOString().substring(0, 10) : undefined;

        this.postsBlogForm = this.fb.group({
            titulo: [post.titulo, [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            subtitulo: [post.subtitulo, [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            descricaoPrevia: [post.descricaoPrevia, [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
            dataPublicacao: [dataPublicacao, [Validators.required]],
            dataExpiracao: [dataExpiracao,],
            destaque: [post.destaque, [Validators.required, FormControlError.noWhitespaceValidator],],
            ativo: [post.ativo, [Validators.required, FormControlError.noWhitespaceValidator],],
            tituloPaginaSEO: [post.tituloPaginaSEO, [Validators.required, Validators.maxLength(150), FormControlError.noWhitespaceValidator]],
            descricaoPaginaSEO: [post.descricaoPaginaSEO, [Validators.required, Validators.maxLength(200), FormControlError.noWhitespaceValidator]],
            categoriaId: [post.categoriaId, Validators.required],
            postTag: this.fb.array(postTags),
            descricao: [post.descricao, [Validators.required, Validators.maxLength(4000), FormControlError.noWhitespaceValidator]],
            arquivo: [[]],
            caminhoImagem: [this.API_ENDPOINT + '/Src/Images/Banner/'],
            nomeImagem: [post.nomeImagem]
        });

        this.postsBlogForm.controls.titulo.setValue('[Duplicado] - ' + post.titulo);
        this.postsBlogForm.controls.dataPublicacao.setValue(new Date().toISOString().substring(0, 10))

        const newPost = new PostsBlogCreateModel(this.postsBlogForm.value);
        this.postsBlogService.post(newPost)
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
        this.duplicarPost(post);
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

}
