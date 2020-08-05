import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PostsBlogModel } from 'src/models/posts-blog/posts-blog.model';
import { CategoriasModel } from 'src/models/categorias/categorias.model';
import { PostsBlogService } from './posts-blog.service';

@Component({
  selector: 'app-posts-blog',
  templateUrl: './posts-blog.component.html',
  styleUrls: ['./posts-blog.component.scss']
})
export class PostsBlogComponent implements OnInit {
  postsBlog: PostsBlogModel[] = [];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  categorias: CategoriasModel[] = [];
  loaded: boolean;
  showPostsDelete: boolean;
  postBlog: PostsBlogModel;

  imagemLargura = 50;
  imagemMargem = 2;

  constructor(
    private postsBlogService: PostsBlogService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  openPostDelete(post: PostsBlogModel) {
    this.postBlog = post;
    this.showPostsDelete = true;
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

}
