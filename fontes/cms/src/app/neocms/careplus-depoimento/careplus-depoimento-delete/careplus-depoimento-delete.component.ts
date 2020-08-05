import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CareplusDepoimentoModel } from 'src/models/careplus-depoimento/careplus-depoimento.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CareplusDepoimentoService } from '../careplus-depoimento.service';

@Component({
  selector: 'app-careplus-depoimento-delete',
  templateUrl: './careplus-depoimento-delete.component.html',
  styleUrls: ['./careplus-depoimento-delete.component.scss']
})
export class CareplusDepoimentoDeleteComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Input()
  careplusDepoimento: CareplusDepoimentoModel;

  usuario: UserAuthenticateModel;

  constructor(
    private careplusDepoimentoService: CareplusDepoimentoService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deleteCareplusDepoimento() {
    this.careplusDepoimentoService
      .delete(this.careplusDepoimento.id)
      .subscribe(result => this.closeModal());
  }
}
