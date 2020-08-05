import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PostsBlogModel } from 'src/models/posts-blog/posts-blog.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { PostsBlogService } from '../posts-blog.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-posts-blog-delete',
  templateUrl: './posts-blog-delete.component.html',
  styleUrls: ['./posts-blog-delete.component.scss']
})
export class PostsBlogDeleteComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Input()
  post: PostsBlogModel;

  usuario: UserAuthenticateModel;
  constructor(
    private postsBlogService: PostsBlogService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deleteBanner() {
    this.postsBlogService
      .delete(this.post.id)
      .subscribe(result => this.closeModal());
  }
}
