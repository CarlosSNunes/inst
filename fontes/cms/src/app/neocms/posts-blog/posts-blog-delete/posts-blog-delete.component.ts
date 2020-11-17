import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PostBlogModel } from './../../../../../src/models/posts-blog/posts-blog.model';
import { UserAuthenticateModel } from './../../../../../src/models/user-authenticate.model';
import { PostsBlogService } from '../posts-blog.service';
import { AuthenticationService } from './../../../../../src/app/authentication/authentication.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-posts-blog-delete',
  templateUrl: './posts-blog-delete.component.html',
  styleUrls: ['./posts-blog-delete.component.scss']
})
export class PostsBlogDeleteComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  @Input() post: PostBlogModel;

  title: string;
  closeBtnName: string;
  list: any[] = [];


  usuario: UserAuthenticateModel;
  constructor(
    private postsBlogService: PostsBlogService,
    private authenticationService: AuthenticationService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deleteBanner() {
    this.postsBlogService
      .delete(this.post[0].id)
      .subscribe(result => this.closeModal());
  }
}
