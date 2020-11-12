import { Component, OnInit } from '@angular/core';
import { faColumns, faDotCircle, faImages, faMedal, faUsers } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';
import { BannerService } from '../banner/banner.service';
import { PostsBlogService } from '../posts-blog/posts-blog.service';
import { UsuarioService } from '../usuario/usuario.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usuariosAtivos: string = '0';
  bannersAtivos: string = '0';
  postsAtivos: string = '0';
  postsMaisLidos: any[] = [];
  postSelecionado: any = null;
  loaded: boolean;
  userResposta: any;
  userCount: number;
  bannerCount: number;
  blogCount: number;


  faUsers = faUsers;
  faImages = faImages;
  faColumns = faColumns;
  faDotCircle = faDotCircle;
  faMedal = faMedal;
  postResult: any;


  constructor(
    private dashboardService: DashboardService,
    private usuarioService: UsuarioService,
    private bannerServices: BannerService,
    private blogService: PostsBlogService,
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getBanners();
    this.getPosts();
    this.getPostsMaisLidos();
    this.loaded = true;
  }


  getUsers() {
    this.usuarioService
      .getAll()
      .subscribe(res => {
        this.loaded = true;
        this.userCount = res.length;
        console.log(this.userCount);
      },
        error => {
          this.loaded = true;
        });
  }

  getBanners() {
    this.bannerServices
      .getAll()
      .subscribe(res => {
        this.loaded = true;
        this.bannerCount = res.length;
      },
        error => {
          this.loaded = true;
        });
  }

  getPosts() {
    this.blogService
      .getAll(1, 100)
      .subscribe(res => {
        this.loaded = true;
        this.postResult = res['result'];
        this.blogCount = res['count'];
        console.log(this.postResult);
      },
        error => {
          this.loaded = true;
        });
  }

  getUsuariosAtivos() {
    this.dashboardService
      .getUsuariosAtivos()
      .subscribe(resp => {
        this.loaded = true;
        this.usuariosAtivos = resp;
      },
        error => {
          this.loaded = true;
        });
  }

  getPostsMaisLidos() {
    this.dashboardService
      .getPostsMaisLidos()
      .subscribe(resp => {
        this.loaded = true;
        this.postsMaisLidos = resp;
      },
        error => {
          this.loaded = true;
        });

    this.postSelecionado = this.postsMaisLidos[0];
  }

  getPostsAtivos() {
    this.dashboardService
      .getPostsAtivos()
      .subscribe(resp => {
        this.loaded = true;
        this.postsAtivos = resp;
        console.log(resp)
      },
        error => {
          this.loaded = true;
        });
  }

  getBannersAtivos() {

    this.dashboardService
      .getBannerAtivos()
      .subscribe(resp => {
        this.loaded = true;
        this.bannersAtivos = resp;
      },
        error => {
          this.loaded = true;
        });

  }

  changePost(index) {

    let filterPost = this.postsMaisLidos.filter(x => x.id == index);
    return this.postSelecionado = filterPost[0];

  }

}
