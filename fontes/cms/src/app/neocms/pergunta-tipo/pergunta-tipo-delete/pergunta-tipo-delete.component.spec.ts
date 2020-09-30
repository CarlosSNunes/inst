import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaTipoDeleteComponent } from './pergunta-tipo-delete.component';
import { PerguntaTipoService } from '../pergunta-tipo.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PerguntaTipoModel } from 'src/models/pergunta-tipo/pergunta-tipo.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of } from 'rxjs';

describe('PerguntaTipoDeleteComponent', () => {
  let component: PerguntaTipoDeleteComponent;
  let fixture: ComponentFixture<PerguntaTipoDeleteComponent>;
  let perguntaTipoService: PerguntaTipoService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerguntaTipoDeleteComponent],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerguntaTipoDeleteComponent);
    component = fixture.componentInstance;
    perguntaTipoService = TestBed.get(PerguntaTipoService);
    component.perguntaTipo = new PerguntaTipoModel({
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

  it('deletePerguntaTipo success', (done: DoneFn) => {
    spyOn(perguntaTipoService, 'delete').and.returnValue(of(null));
    component.deletePerguntaTipo();
    fixture.detectChanges();
    done();
    return;
  });
});
