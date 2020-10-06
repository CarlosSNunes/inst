import { Component, OnInit } from '@angular/core';
import { faPlus, faCog, faEdit, faTrashAlt, faCalendarPlus, faEye, faClone, faArrowAltCircleLeft, faThumbsDown, faStar } from '@fortawesome/free-solid-svg-icons';
import { PostsBlogModel } from 'src/models/posts-blog/posts-blog.model';
import { CategoriasModel } from 'src/models/categorias/categorias.model';
import { PostsBlogService } from './posts-blog.service';
import { TagModel } from 'src/models/tag/tag.model';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { CategoriasService } from './categorias/categorias.service';
import { TagService } from './tag/tag.service';

@Component({
  selector: 'app-posts-blog',
  templateUrl: './posts-blog.component.html',
  styleUrls: ['./posts-blog.component.scss']
})
export class PostsBlogComponent implements OnInit {
  postsBlog: PostsBlogModel[] = [];
  tagsModel: TagModel[] = [];
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
  loaded: boolean;
  showPostsDelete: boolean;
  postBlog: PostsBlogModel;
  usuario: UserAuthenticateModel;
  podeEscrever: boolean = false;
  imagemLargura = 50;
  imagemMargem = 2;

  constructor(
    private postsBlogService: PostsBlogService,
    private authenticationService: AuthenticationService,
    private categoriasService: CategoriasService,
    private tagService: TagService
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

  getPosts() {
    this.postsBlog  = [
      {
      'id': 1,
      'titulo': 'Title Post 01',
      'subtitulo': 'Subtitle post 01',
      'descricaoPrevia': 'Descrição previa',
      'descricao': 'Descrição POST',
      'dataPublicacao': '2020/09/29',
      'dataExpiracao': '31/12/2020',   
      'dataCadastro': '2020/09/29',
      'caminhoImagem': '/assets/img/',
      'nomeImagem': 'careplus.png',
      'destaque': 'false',
      'ativo': 'false',
      'vizualizacoes': 10,
      'tituloPaginaSEO': 'title page SEO',
      'descricaoPaginaSEO': 'SEO Description',
      'categoriaId': 1,
      'postsTag': [
                    { 'id': 1,
                    'descricao': 'Tag 01',
                    'dataCadastro': new Date(),
                    'selected': true
                    },
                    { 'id': 2,
                    'descricao': 'Tag 02',
                    'dataCadastro': new Date(),
                    'selected': true
                    }
      ]
      },
      {
        'id': 2,
        'titulo': 'Title Post 02',
        'subtitulo': 'Subtitle post 01',
        'descricaoPrevia': 'Descrição previa',
        'descricao': 'Descrição POST',
        'dataPublicacao': '2020/09/29',
        'dataExpiracao': '31/12/2020',   
        'dataCadastro': '2020/09/29',
        'caminhoImagem': '/assets/img/',
        'nomeImagem': 'careplus.png',
        'destaque': 'true',
        'ativo': 'true',
        'vizualizacoes': 10,
        'tituloPaginaSEO': 'title page SEO',
        'descricaoPaginaSEO': 'SEO Description',
        'categoriaId': 2,
        'postsTag': [
                      { 'id': 1,
                      'descricao': 'Tag 01',
                      'dataCadastro': new Date(),
                      'selected': true
                      },
                      { 'id': 2,
                      'descricao': 'Tag 02',
                      'dataCadastro': new Date(),
                      'selected': true
                      }
        ]
      }
  ];


    this.showPostsDelete = false;
    // this.postsBlogService
    //   .getAll()
    //   .subscribe(postsBlog => {
    //     this.loaded = true;
    //     this.postsBlog = postsBlog;
    //   },
    //     error => {
    //       this.loaded = true;
    //     });

  
  }

  filterPosts(input)
  {
    if(input.value != '')
    {
      //this.postBlog = this.postBlog.filter(x => x.descricao == input.value);
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

  // getPostByCategory(id) {
  //   this.postsBlogService
  //     .getByCategoryId(id.selectedIndex)
  //     .subscribe(result => {
  //       this.loaded = true;
  //       this.postBlog = result;
  //       console.log(result);
  //     },
  //       error => {
  //         this.loaded = true;
  //       });
  // }

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

}
