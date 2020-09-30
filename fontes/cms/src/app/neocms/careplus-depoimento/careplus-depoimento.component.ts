import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CareplusDepoimentoModel } from 'src/models/careplus-depoimento/careplus-depoimento.model';
import { CareplusDepoimentoService } from './careplus-depoimento.service';

@Component({
  selector: 'app-careplus-depoimento',
  templateUrl: './careplus-depoimento.component.html',
  styleUrls: ['./careplus-depoimento.component.scss']
})
export class CareplusDepoimentoComponent implements OnInit {
  careplusDepoimentos: CareplusDepoimentoModel[] = [];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  loaded: boolean;
  showCareplusDepoimentoDelete: boolean;
  careplusDepoimento: CareplusDepoimentoModel;

  constructor(
    private careplusDepoimentoService: CareplusDepoimentoService
  ) { }

  ngOnInit() {
    this.getCareplusDepoimentos();
  }

  openCareplusDepoimentoDelete(careplusDepoimento: CareplusDepoimentoModel) {
    this.careplusDepoimento = careplusDepoimento;
    this.showCareplusDepoimentoDelete = true;
  }

  getCareplusDepoimentos() {
    this.showCareplusDepoimentoDelete = false;
    this.careplusDepoimentoService
      .getAll()
      .subscribe(careplusDepoimentos => {
        this.loaded = true;
        this.careplusDepoimentos = careplusDepoimentos;
      },
        error => {
          this.loaded = true;
        });
  }

}
