import { Component, OnInit, TemplateRef } from '@angular/core';
import { faPencilAlt, faTrash, faPlus, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  result;
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
  ) { }

  pageChanged(event: any): void {
    this.pageChanged = event.page;
  }

  ngOnInit() {
    this.getCategorias();
  }
  getCategorias() {
    this.showCategoriaDelete = false;
    this.categoriasService
      .getAll(0, 100)
      .subscribe(categorias => {
        this.loaded = true;
        this.categorias = categorias;
        this.result = categorias['result'];
        this.count = categorias['count'];
        console.log(this.result);
      },
        error => {
          this.loaded = true;
        });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(id: number): void {
    this.categoriasService
      .delete(id)
      .subscribe(result => {
        this.message = 'Categoria:' + id + ' deletada com sucesso!';
        this.modalRef.hide();
      });

  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}
