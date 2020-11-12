import { Component, OnInit } from '@angular/core';
import { PostsBlogModel } from './../../../../../src/models/posts-blog/posts-blog.model';
import { MaisLidosService } from './mais-lidos.service';

@Component({
  selector: 'app-mais-lidos',
  templateUrl: './mais-lidos.component.html',
  styleUrls: ['./mais-lidos.component.scss']
})
export class MaisLidosComponent implements OnInit {
  posts: PostsBlogModel[] = []
  loaded: boolean;
  post: PostsBlogModel

  constructor(
    private maisLidosService: MaisLidosService
  ) { }

  ngOnInit() {
    this.getMaisLidos();
  }

  getMaisLidos() {
    this.maisLidosService
      .getAll()
      .subscribe(posts => {
        this.loaded = true;
        this.posts = posts;
      },
        error => {
          this.loaded = true;
        });
  }
}
