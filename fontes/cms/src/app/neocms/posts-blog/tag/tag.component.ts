import { Component, OnInit, TemplateRef } from '@angular/core';
import { TagService } from './tag.service';
import { TagModel } from 'src/models/tag/tag.model';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';


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
    modalRef: BsModalRef;
    message: string;
    paginaAtual = 1;
    contador = 5;
    tagCount: number = 0;

    constructor(
        private tagService: TagService,
        private modalService: BsModalService,
        private toastrService: ToastrService
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
        const offset = (this.paginaAtual - 1) * this.contador;
        this.tagService
            .getAll(offset, this.contador)
            .subscribe(tags => {
                this.loaded = true;
                this.tags = tags.result;
                this.tagCount = tags.count;
            },
                (error) => {
                    let message = '';
                    if (error.error) {
                        message = error.error.message || 'Erro Interno no servidor';
                    } else {
                        message = error.message || 'Erro Interno';
                    }
                    this.toastrService.error(message);
                    this.loaded = true;
                });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }

    confirm(id: number): void {
        this.tagService
            .delete(id)
            .subscribe(_ => {
                this.message = 'Tag:' + id + ' deletada com sucesso!';
                this.modalRef.hide();
                this.toastrService.success(this.message);
            }, (error) => {
                let message = '';
                if (error.error) {
                    message = error.error.message || 'Erro Interno no servidor';
                } else {
                    message = error.message || 'Erro Interno';
                }
                this.modalRef.hide();
                this.toastrService.error(message);
            });

    }

    decline(): void {
        this.message = 'Declined!';
        this.modalRef.hide();
    }

    onPageChange(page: number) {
        this.paginaAtual = page;
        this.getTags();
    }

}
