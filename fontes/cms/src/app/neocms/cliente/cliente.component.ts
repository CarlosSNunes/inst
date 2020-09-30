import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/models/cliente/cliente.model';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  clientes: ClienteModel[] = [];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  loaded: boolean;
  showClienteDelete: boolean;
  cliente: ClienteModel;

  constructor(
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.getClientes();
  }

  openClienteDelete(cliente: ClienteModel) {
    this.cliente = cliente;
    this.showClienteDelete = true;
  }

  getClientes() {
    this.showClienteDelete = false;
    this.clienteService
      .getAll()
      .subscribe(clientes => {
        this.loaded = true;
        this.clientes = clientes;
      },
        error => {
          this.loaded = true;
        });
  }

}
