import { Component, OnInit, TemplateRef } from '@angular/core';
import { TagService } from './tag.service';
import { TagModel } from './../../../../../src/models/tag/tag.model';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  tags: TagModel[] = [];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  loaded: boolean;
  showTagDelete: boolean;
  tag: TagModel;
  result: any;
  modalRef: BsModalRef;
  message: string;
  paginaAtual = 1;
  contador = 5;

  constructor(
    private tagService: TagService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.getTags();
  }

  openTagDelete(tag: TagModel) {
    this.tag = tag;
    this.showTagDelete = true;
  }

  getTags() {
    this.showTagDelete = false;
    this.tagService
      .getAll(0, 20)
      .subscribe(tags => {
        this.loaded = true;
        this.tags = tags.result;
        this.result = tags.result;

        console.log(this.tags);
      },
        error => {
          this.loaded = true;
        });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(id: number): void {
    this.tagService
      .delete(id)
      .subscribe(result => {
        this.message = 'Tag:' + id + ' deletada com sucesso!';
        this.modalRef.hide();
      });

  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

}
