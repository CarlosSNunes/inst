import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoFinanceiroCreateComponent } from './resultado-financeiro-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ResultadoFinanceiroService } from '../resultado-financeiro.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { throwError, of } from 'rxjs';

describe('ResultadoFinanceiroCreateComponent', () => {
  let component: ResultadoFinanceiroCreateComponent;
  let fixture: ComponentFixture<ResultadoFinanceiroCreateComponent>;
  let resultadoFinanceiroService: ResultadoFinanceiroService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultadoFinanceiroCreateComponent
      ],
      imports: [
        ReactiveFormsModule,
        FontAwesomeModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoFinanceiroCreateComponent);
    component = fixture.componentInstance;
    resultadoFinanceiroService = TestBed.get(ResultadoFinanceiroService);
    authenticateService = new AuthenticationService();
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    component.usuario = new UserAuthenticateModel({ perfis: [] });
    expect(component).toBeTruthy();
  });

  it('getErrors', () => {
    const descricao = component.resultadoFinanceiroForm.controls.titulo;
    const result = component.getErrors(descricao);
    expect(result).not.toBeNull();
  });

  it('updateFileName', () => {
    component.usuario = new UserAuthenticateModel({ perfis: [] });
    const arquivos = [{ name: 'arquivo.png' }];
    component.updateFileName(arquivos);
    expect(component.arquivoNome).toEqual('arquivo.png');
  });

  it('updateFileName empty', () => {
    const arquivos = [];
    component.updateFileName(arquivos);
    expect(component.arquivo).toBeNull();
  });

  it('onSubmit', () => {
    component.onSubmit();
    expect(component.resultadoFinanceiroForm.valid).toEqual(false);
  });

  it('onSubmit success', (done: DoneFn) => {
    component.usuario = new UserAuthenticateModel({ perfis: [] });
    component.createForm();
    spyOn(resultadoFinanceiroService, 'post').and.returnValue(of(null));
    component.f.titulo.setValue('titulo');
    component.f.ano.setValue(2020);
    component.f.arquivo.setValue('arquivo.png');
    const dataCorteElement: any = document.querySelector('#dataCorte');

    dataCorteElement.bulmaCalendar.date.start = new Date();
    component.onSubmit();
    fixture.detectChanges();
    expect(component.resultadoFinanceiroForm.valid).toEqual(true);
    done();
  });
});
