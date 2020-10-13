import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PostsBlogModel } from 'src/models/posts-blog/posts-blog.model';
import { CategoriasModel } from 'src/models/categorias/categorias.model';
import { PostsBlogService } from './posts-blog.service';
import { TagModel } from 'src/models/tag/tag.model';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { CategoriasService } from './categorias/categorias.service';
import { TagService } from './tag/tag.service';
import { PostsBlogCreateModel } from 'src/models/posts-blog/posts-blog-create.model';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PostsBlogDeleteComponent } from './posts-blog-delete/posts-blog-delete.component';
import { UsuarioModel } from 'src/models/usuario/usuario.model';

@Component({
  selector: 'app-posts-blog',
  templateUrl: './posts-blog.component.html',
  styleUrls: ['./posts-blog.component.scss']
})
export class PostsBlogComponent implements OnInit {
  usuario: UsuarioModel;
  postsBlog: PostsBlogModel[] = [];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  categorias: CategoriasModel[] = [];
  loaded: boolean;
  showPostsDelete: boolean;
  postBlog: PostsBlogModel;
  podeEscrever: Boolean = false;

  imagemLargura = 50;
  imagemMargem = 2;
  bsModalRef: BsModalRef;

  constructor(
    private postsBlogService: PostsBlogService,
    private authenticationService: AuthenticationService,
    private categoriasService: CategoriasService,
    private tagService: TagService,
    private modalService: BsModalService

  ) { 
    this.authenticationService.usuarioChanged.subscribe(usuario =>
      this.usuario = usuario
    );
  }

  ngOnInit() {
    //this.usuario = this.authenticationService.state;
    
    this.usuario.usuarioPerfil.forEach(perfil => {
        if(perfil == 'Editor' || perfil == 'Administrador')
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
    //this.postBlog = post;
    this.showPostsDelete = true;

    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Deletar Post'
    };
    this.bsModalRef = this.modalService.show(PostsBlogDeleteComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Fechar';
  }


  getPosts() {
    this.showPostsDelete = false;
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
    else{
      this.getPosts();
    }

  }

  getPostByCategory(select)
  {
    this.getPosts();

    if(select.value != '')
    {
      this.postsBlog = this.postsBlog.filter(x => x.categoriaId == select.value);
    }
  }

   getCategorias() {
    this.categoriasService
      .getAll()
      .subscribe(resp => {
        this.loaded = true;
        this.categorias = resp;
      },
        error => {
          this.loaded = true;
        });
  }

  duplicarPost(postId)
  {
    this.postsBlogService
      .getById(postId)
      .subscribe(postBlog => {
        this.postBlog = postBlog;
        this.postBlog.titulo =  '(Duplicado) -' + this.postBlog.titulo
        this.postBlog.dataPublicacao = Date.now().toLocaleString();
        this.postBlog.dataExpiracao = '';
        
        const model = new PostsBlogCreateModel(this.postBlog);
        this.postsBlogService.post(model)
          .subscribe(() =>
            this.getPosts()
          );
      });
  }

}
