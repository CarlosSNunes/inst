import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareplusDepoimentoDeleteComponent } from './careplus-depoimento-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CareplusDepoimentoService } from '../careplus-depoimento.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CareplusDepoimentoModel } from 'src/models/careplus-depoimento/careplus-depoimento.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of } from 'rxjs';

describe('CareplusDepoimentoDeleteComponent', () => {
  let component: CareplusDepoimentoDeleteComponent;
  let fixture: ComponentFixture<CareplusDepoimentoDeleteComponent>;
  let careplusDepoimentoService: CareplusDepoimentoService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CareplusDepoimentoDeleteComponent],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareplusDepoimentoDeleteComponent);
    component = fixture.componentInstance;
    careplusDepoimentoService = TestBed.get(CareplusDepoimentoService);
    component.careplusDepoimento = new CareplusDepoimentoModel({
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

  it('deleteCareplusDepoimento success', (done: DoneFn) => {
    spyOn(careplusDepoimentoService, 'delete').and.returnValue(of(null));
    component.deleteCareplusDepoimento();
    fixture.detectChanges();
    done();
    return;
  });
});
