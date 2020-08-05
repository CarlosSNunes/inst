import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { TagModel } from 'src/models/tag/tag.model';
import { TagService } from '../tag.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-tag-delete',
  templateUrl: './tag-delete.component.html',
  styleUrls: ['./tag-delete.component.scss']
})
export class TagDeleteComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Input()
  tag: TagModel;

  usuario: UserAuthenticateModel;

  constructor(
    private tagService: TagService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deleteTag() {
    this.tagService
      .delete(this.tag.id)
      .subscribe(result => this.closeModal());
  }

}
