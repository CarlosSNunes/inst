import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaDeleteComponent } from './pergunta-delete.component';
import { PerguntaService } from '../pergunta.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PerguntaModel } from 'src/models/pergunta/pergunta.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of } from 'rxjs';

describe('PerguntaDeleteComponent', () => {
  let component: PerguntaDeleteComponent;
  let fixture: ComponentFixture<PerguntaDeleteComponent>;
  let perguntaService: PerguntaService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerguntaDeleteComponent],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerguntaDeleteComponent);
    component = fixture.componentInstance;
    perguntaService = TestBed.get(PerguntaService);
    component.pergunta = new PerguntaModel({
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

  it('deletePergunta success', (done: DoneFn) => {
    spyOn(perguntaService, 'delete').and.returnValue(of(null));
    component.deletePergunta();
    fixture.detectChanges();
    done();
    return;
  });
});
