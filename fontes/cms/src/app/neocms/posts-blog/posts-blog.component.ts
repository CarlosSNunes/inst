import { Component, OnInit, TemplateRef } from '@angular/core';
import { faPlus, faCog, faEdit, faTrashAlt, faCalendarPlus, faEye, faClone, faArrowAltCircleLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { PostsBlogModel } from './../../../../src/models/posts-blog/posts-blog.model';
import { CategoriasModel } from './../../../../src/models/categorias/categorias.model';
import { PostsBlogService } from './posts-blog.service';
import { TagModel } from './../../../../src/models/tag/tag.model';
import { AuthenticationService } from './../../../../src/app/authentication/authentication.service';
import { UserAuthenticateModel } from './../../../../src/models/user-authenticate.model';
import { CategoriasService } from './categorias/categorias.service';
import { PostsBlogCreateModel } from './../../../../src/models/posts-blog/posts-blog-create.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PostsBlogDeleteComponent } from './posts-blog-delete/posts-blog-delete.component';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { FormControlError } from './../../../../src/utils/form-control-error';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../../src/environments/environment';


@Component({
  selector: 'app-posts-blog',
  templateUrl: './posts-blog.component.html',
  styleUrls: ['./posts-blog.component.scss']
})
export class PostsBlogComponent implements OnInit {

  postsBlog;
  tagsModel: TagModel[] = [];
  arquivo: File;
  postsBlogForm;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faCalendarPlus = faCalendarPlus;
  faEye = faEye;
  faClone = faClone;
  faStar = faStar;
  faPlus = faPlus;
  faCog = faCog;
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  categorias: CategoriasModel[] = [];
  categoriaSelecionada: number = 0;
  loaded: boolean;
  showPostsDelete: boolean;
  postBlog: PostsBlogModel;
  usuario: UserAuthenticateModel;
  podeEscrever: boolean = false;
  imagemLargura = 50;
  imagemMargem = 2;
  bsModalRef: BsModalRef;
  message: string;
  pathDivision = '/';

  totalItems: number;
  currentPage: number;
  smallnumPages = 0;

  private readonly API_ENDPOINT = environment.API;
  postCount: any;

  constructor(
    private postsBlogService: PostsBlogService,
    private authenticationService: AuthenticationService,
    private categoriasService: CategoriasService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private router: Router,

  ) {
    this.authenticationService.usuarioChanged.subscribe(usuario =>
      this.usuario = usuario
    );
  }

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
    this.usuario.perfis.forEach(perfil => {
      if (perfil.descricao == 'Editor' || perfil.descricao == 'Administrador') {
        this.podeEscrever = true;
      }
    });
    this.getPosts();
    this.getCategorias();
  }

  openPostDelete(post: PostsBlogModel) {
    this.postBlog = post;
    this.showPostsDelete = true;
  }

  openModalDelete(post: PostsBlogModel) {
    this.showPostsDelete = true;
    const initialState = {
      title: 'Deletar Post?'
    };
    this.bsModalRef = this.modalService.show(PostsBlogDeleteComponent);
  }

  getPosts() {
    //this.showPostsDelete = false;
    this.postsBlogService
      .getAll(0, 100)
      .subscribe(postsBlog => {
        this.loaded = true;
        this.postsBlog = postsBlog['result'];
        this.postCount = postsBlog['count'];
        this.totalItems = this.postCount;
      },
        error => {
          this.loaded = true;
        });
  }

  filterPosts(input) {
    if (input.value != '') {
      this.postsBlog = this.postsBlog['result'].filter(x => x.titulo.includes(input.value));
    }
  }

  filterPostByCategory(select) {
    if (select.value > 0) {
      this.getPosts();
      setTimeout(() => {
        this.postsBlog = this.postsBlog['result'].filter(x => x.categoriaId == select.value);
      }, 500);
    }
  }

  salvarAlteracoes() { }

  buscarCategoriaDescricao(categoriaId) {
    this.categorias.forEach(cat => {
      if (cat['result'].id == categoriaId) {
        return cat['result'].descricao;
      }
    });
  }

  getPostsBySearch(): any {
    this.postsBlogService
      .getAll(0, 100)
      .subscribe(postsBlog => {
        this.loaded = true;
        this.postsBlog = postsBlog;
      },
        error => {
          this.loaded = true;
        });

    return this.postBlog;
  }

  getCategorias() {
    this.categoriasService
      .getAll(0, 100)
      .subscribe(result => {
        this.loaded = true;
        this.categorias = result['result'];
        console.log(result);
      },
        error => {
          this.loaded = true;
        });
  }

  duplicarPost(post: PostsBlogModel) {
    this.postsBlogForm = this.fb.group({
      titulo: [post[0].titulo, [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      subtitulo: [post[0].subtitulo, [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      descricaoPrevia: [post[0].descricaoPrevia, [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      dataPublicacao: [post[0].dataPublicacao, [Validators.required]],
      dataExpiracao: [post[0].dataExpiracao],
      destaque: [post[0].destaque, [Validators.required, FormControlError.noWhitespaceValidator],],
      ativo: [post[0].ativo, [Validators.required, FormControlError.noWhitespaceValidator],],
      tituloPaginaSEO: [post[0].tituloPaginaSEO, [Validators.required, Validators.maxLength(150), FormControlError.noWhitespaceValidator]],
      descricaoPaginaSEO: [post[0].descricaoPaginaSEO, [Validators.required, Validators.maxLength(200), FormControlError.noWhitespaceValidator]],
      categoriaId: [post[0].categoriaId, Validators.required],
      postTag: this.fb.array(post[0].postTag),
      descricao: [post[0].descricao, [Validators.required, Validators.maxLength(4000), FormControlError.noWhitespaceValidator]],
      arquivo: [[]],
      caminhoImagem: [this.API_ENDPOINT + '/Src/Images/Banner/'],
      nomeImagem: [post[0].nomeImagem]
    });

    this.postsBlogForm.controls.titulo.setValue('[Duplicado] - ' + post[0].titulo);
    this.postsBlogForm.controls.dataPublicacao = formatDate(new Date().toString(), 'dd/MM/yyyy', 'en');
    this.postsBlogForm.controls.descricao.setValue("descrição");

    const newPost = new PostsBlogCreateModel(this.postsBlogForm.value);
    this.postsBlogService.post(newPost)
      .subscribe(() =>
        this.getPosts()
      );
  }

  openModalDuplicarPost(template: TemplateRef<PostsBlogModel>) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDuplicar(post): void {
    this.duplicarPost(post);
    this.bsModalRef.hide();
  }

  confirmExcluir(post): void {
    this.postsBlogService.delete(post.id)
      .subscribe(() => {
        this.getPosts();
      });
    this.bsModalRef.hide();
  }

  decline(): void {
    this.bsModalRef.hide();
  }

}
