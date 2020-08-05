import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CareplusDiferencialService } from '../careplus-diferencial.service';
import { CareplusDiferencialModel } from 'src/models/careplus-diferencial/careplus-diferencial.model';

@Component({
  selector: 'app-careplus-diferencial-delete',
  templateUrl: './careplus-diferencial-delete.component.html',
  styleUrls: ['./careplus-diferencial-delete.component.scss']
})
export class CareplusDiferencialDeleteComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Input()
  careplusDiferencial: CareplusDiferencialModel;

  usuario: UserAuthenticateModel;

  constructor(
    private careplusDiferencialService: CareplusDiferencialService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deleteCareplusDiferencial() {
    this.careplusDiferencialService
      .delete(this.careplusDiferencial.id)
      .subscribe(result => this.closeModal());
  }
}
