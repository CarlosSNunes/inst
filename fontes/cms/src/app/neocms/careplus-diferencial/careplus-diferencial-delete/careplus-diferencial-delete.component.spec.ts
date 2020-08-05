import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareplusDiferencialDeleteComponent } from './careplus-diferencial-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of } from 'rxjs';
import { CareplusDiferencialService } from '../careplus-diferencial.service';
import { CareplusDiferencialModel } from 'src/models/careplus-diferencial/careplus-diferencial.model';

describe('DiferencialDeleteComponent', () => {
  let component: CareplusDiferencialDeleteComponent;
  let fixture: ComponentFixture<CareplusDiferencialDeleteComponent>;
  let careplusDiferencialService: CareplusDiferencialService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CareplusDiferencialDeleteComponent],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareplusDiferencialDeleteComponent);
    component = fixture.componentInstance;
    careplusDiferencialService = TestBed.get(CareplusDiferencialService);
    component.careplusDiferencial = new CareplusDiferencialModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });
    authenticateService = new AuthenticationService();
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeModal', () => {
    component.closeModal();
    return;
  });

  it('deleteCareplusDiferencial success', (done: DoneFn) => {
    spyOn(careplusDiferencialService, 'delete').and.returnValue(of(null));
    component.deleteCareplusDiferencial();
    fixture.detectChanges();
    done();
    return;
  });
});
