import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
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
  

  constructor(private dashboardService: DashboardService) {

   }

  ngOnInit() {
    
    this.getUsuariosAtivos();
    this.getPostsMaisLidos();
    this.getPostsAtivos();
    this.getBannersAtivos();
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

  getPostsMaisLidos(){

    const posts = [
      { id: 1, titulo: 'Titulo 01', subtitulo:'Noticia 01 ...', imagem:'assets/img/careplus_logo.svg' },
      { id: 2, titulo: 'Mr. Nice', subtitulo:'subtitulo 02 ...' , imagem:'assets/img/careplus_logo.svg'},
      { id: 3, titulo: 'Narco', subtitulo:'subtitulo 03 ...', imagem:'assets/img/careplus_logo.svg'  },
      { id: 4, titulo: 'Bombasto', subtitulo:'subtitulo 04 ...', imagem:'assets/img/careplus_logo.svg' },
      { id: 5, titulo: 'Celeritas', subtitulo:'subtitulo 05 ...', imagem:'assets/img/careplus_logo.svg' },
      { id: 6, titulo: 'Magneta', subtitulo:'subtitulo 06 ...', imagem:'assets/img/careplus_logo.svg' },
      { id: 7, titulo: 'RubberMan', subtitulo:'subtitulo 07 ...' , imagem:'assets/img/careplus_logo.svg'},
      { id: 8, titulo: 'Dynama', subtitulo:'subtitulo 08 ...', imagem:'assets/img/careplus_logo.svg' },
      { id: 9, titulo: 'Dr IQ', subtitulo:'subtitulo 09 ...', imagem:'assets/img/careplus_logo.svg' },
      { id: 10, titulo: 'Magma', subtitulo:'subtitulo 10 ...', imagem:'assets/img/careplus_logo.svg' },
     
    ];

    // this.dashboardService
    //   .getPostsMaisLidos()
    //   .subscribe(resp => {
    //     this.loaded = true;
    //     this.postsMaisLidos = resp;
    //   },
    //     error => {
    //       this.loaded = true;
    //     });

    this.postsMaisLidos = posts;
    this.postSelecionado = this.postsMaisLidos[0];
    return this.postsMaisLidos;
  }

  getPostsAtivos(){

    this.dashboardService
    .getPostsAtivos()
    .subscribe(resp => {
      this.loaded = true;
      this.postsAtivos = resp;
    },
      error => {
        this.loaded = true;
      });

      return this.postsAtivos;
  }

  getBannersAtivos(){

    // const bannersAtivos = 6;
    // this.bannersAtivos = bannersAtivos;
    // return this.bannersAtivos;
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

  changePost(index){

    let filterPost = this.postsMaisLidos.filter(x => x.id == index);
    return this.postSelecionado = filterPost[0];

  }

}
