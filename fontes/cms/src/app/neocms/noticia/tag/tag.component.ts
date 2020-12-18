import { Component, OnInit } from '@angular/core';
import { TagService } from './tag.service';
import { TagModel } from 'src/models/tag/tag.model';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

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

  constructor(
    private tagService: TagService
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
      .getAll()
      .subscribe(tags => {
        this.loaded = true;
        this.tags = tags;
      },
        error => {
          this.loaded = true;
        });
  }

}
