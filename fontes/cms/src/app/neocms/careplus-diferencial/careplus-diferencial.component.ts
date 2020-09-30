import { Component, OnInit } from '@angular/core';
import { CareplusDiferencialService } from './careplus-diferencial.service';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CareplusDiferencialModel } from 'src/models/careplus-diferencial/careplus-diferencial.model';

@Component({
  selector: 'app-careplus-diferencial',
  templateUrl: './careplus-diferencial.component.html',
  styleUrls: ['./careplus-diferencial.component.scss']
})
export class CareplusDiferencialComponent implements OnInit {
  careplusDiferenciais: CareplusDiferencialModel[] = [];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  loaded: boolean;
  showCareplusDiferencialDelete: boolean;
  careplusDiferencial: CareplusDiferencialModel;

  constructor(
    private careplusDiferencialService: CareplusDiferencialService
  ) { }

  ngOnInit() {
    this.getCareplusDiferenciais();
  }

  openCareplusDiferencialDelete(careplusDiferencial: CareplusDiferencialModel) {
    this.careplusDiferencial = careplusDiferencial;
    this.showCareplusDiferencialDelete = true;
  }

  getCareplusDiferenciais() {
    this.showCareplusDiferencialDelete = false;
    this.careplusDiferencialService
      .getAll()
      .subscribe(careplusDiferenciais => {
        this.loaded = true;
        this.careplusDiferenciais = careplusDiferenciais;
      })
      .add(() => this.loaded = true);
  }
}
