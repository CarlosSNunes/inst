import { Component, OnInit, TemplateRef } from '@angular/core';
import { faPencilAlt, faTrash, faPlus, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CategoriasModel } from './../../../../../src/models/categorias/categorias.model';
import { CategoriasService } from './categorias.service';

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
    categorias: CategoriasModel[] = [];
    faPencilAlt = faPencilAlt;
    faTrash = faTrash;
    faPlus = faPlus;
    faFileExcel = faFileExcel;
    loaded: boolean;
    showCategoriaDelete: boolean;
    count: number;
    paginaAtual = 1;
    contador = 5;
    modalRef: BsModalRef;
    message: string;
    cat: CategoriasModel;
    /**
     * 
     * @param pagination
     * itemsPerPage
     */

    constructor(
        private categoriasService: CategoriasService,
        private modalService: BsModalService,
        private toastrService: ToastrService
    ) { }

    pageChanged(event: any): void {
        this.pageChanged = event.page;
    }

    ngOnInit() {
        this.getCategorias();
    }
    getCategorias() {
        this.showCategoriaDelete = false;
        const offset = (this.paginaAtual - 1) * this.contador;
        this.categoriasService
            .getAll(offset, this.contador)
            .subscribe(categorias => {
                this.loaded = true;
                this.categorias = categorias.result;
                this.count = categorias.count;
            },
                (error) => {
                    this.loaded = true;
                    let message = '';
                    if (error.error) {
                        message = error.error.message || 'Erro Interno no servidor';
                    } else {
                        message = error.message || 'Erro Interno';
                    }
                    this.toastrService.error(message);
                });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }

    confirm(id: number): void {
        this.categoriasService
            .delete(id)
            .subscribe(_ => {
                this.message = 'Categoria:' + id + ' deletada com sucesso!';
                this.modalRef.hide();
                this.toastrService.success(this.message)
            }, (error) => {
                let message = '';
                if (error.error) {
                    message = error.error.message || 'Erro Interno no servidor';
                } else {
                    message = error.message || 'Erro Interno';
                }
                this.toastrService.error(message);
            });

    }

    decline(): void {
        this.message = 'Declined!';
        this.modalRef.hide();
    }

    onPageChange(page: number) {
        this.paginaAtual = page;
        this.getCategorias();
    }
}
