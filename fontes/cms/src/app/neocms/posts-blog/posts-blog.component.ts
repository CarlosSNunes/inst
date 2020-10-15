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

@Component({
  selector: 'app-posts-blog',
  templateUrl: './posts-blog.component.html',
  styleUrls: ['./posts-blog.component.scss']
})
export class PostsBlogComponent implements OnInit {
  postsBlog: PostsBlogModel[] = [];
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

  ngOnInit() {
    this.usuario = this.authenticationService.state;

    this.usuario.perfis.forEach(perfil => {
        if(perfil.descricao == 'Editor' || perfil.descricao == 'Administrador')
        {
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
      //post: post,
      title: 'Deletar Post?'
    };
    this.bsModalRef = this.modalService.show(PostsBlogDeleteComponent);
    //this.bsModalRef.content.closeBtnName = 'Fechar';
  }


  getPosts() {
    //this.showPostsDelete = false;
    this.postsBlogService
      .getAll()
      .subscribe(postsBlog => {
        this.loaded = true;
        this.postsBlog = postsBlog;
        
      },
        error => {
          this.loaded = true;
        });

  }

  filterPosts(input)
  {
    if(input.value != '')
    {
      this.postsBlog = this.postsBlog.filter(x => x.titulo.includes(input.value));
    }
  }

  filterPostByCategory(select)
  {
    if(select.value > 0)
    {
       this.getPosts();
        setTimeout(() => {
        this.postsBlog = this.postsBlog.filter(x => x.categoriaId == select.value);
       }, 500);
    }
  }
  salvarAlteracoes(){}

  buscarCategoriaDescricao(categoriaId){

    this.categorias.forEach(cat => {

      if(cat.id == categoriaId)
      {
        return cat.descricao;
      }
    });
  }

  getPostsBySearch(): any{
    this.postsBlogService
      .getAll()
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
    .getAll()
    .subscribe(result => {
      this.loaded = true;
      this.categorias = result;
      console.log(result);
    },
      error => {
        this.loaded = true;
      });
  }

  duplicarPost(post: PostsBlogModel)
  {

    this.postsBlogForm = this.fb.group({
      titulo: [ post.titulo, [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      subtitulo: [post.subtitulo, [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      descricaoPrevia: [post.descricaoPrevia, [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      dataPublicacao: [post.dataPublicacao, [Validators.required]],
      dataExpiracao: [post.dataExpiracao],
      destaque: [post.destaque, [Validators.required, FormControlError.noWhitespaceValidator],],
      ativo: [post.ativo, [Validators.required, FormControlError.noWhitespaceValidator],],
      tituloPaginaSEO: [post.tituloPaginaSEO, [Validators.required, Validators.maxLength(150), FormControlError.noWhitespaceValidator]],
      descricaoPaginaSEO: [post.descricaoPaginaSEO, [Validators.required, Validators.maxLength(200), FormControlError.noWhitespaceValidator]],
      categoriaId: [post.categoriaId, Validators.required],
      postTag: this.fb.array(post.postTag),
      descricao: [post.descricao, [Validators.required, Validators.maxLength(4000), FormControlError.noWhitespaceValidator]],
      arquivo: [[]],
      caminhoImagem: ['http://52.3.44.106:8081/Src/Images/Banner/'],
      nomeImagem: [post.nomeImagem]
    });

        this.postsBlogForm.controls.titulo.setValue('[Duplicado] - ' + post.titulo);
        this.postsBlogForm.controls.dataPublicacao = formatDate(new Date().toString(), 'dd/MM/yyyy', 'en');
        this.postsBlogForm.controls.descricao.setValue("descrição");

        const newPost = new PostsBlogCreateModel(this.postsBlogForm.value);
        this.postsBlogService.post(newPost)
          .subscribe(() =>
            this.getPosts()
        );
  }



  openModalDuplicarPost(template: TemplateRef<PostsBlogModel>) {

    this.bsModalRef = this.modalService.show(template, {class: 'modal-md'});

  }

  confirmDuplicar(post): void {
    this.duplicarPost(post);
    this.bsModalRef.hide();
  }

  confirmExcluir(post): void {
    this.postsBlogService.delete(post.id)
      .subscribe(()=>
      {
        this.getPosts();
      });
    this.bsModalRef.hide();
  }

  decline(): void {
    this.bsModalRef.hide();
  }

}
