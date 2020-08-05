import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoFinanceiroEditComponent } from './resultado-financeiro-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ResultadoFinanceiroService } from '../resultado-financeiro.service';
import { ResultadoFinanceiroModel } from 'src/models/resultado-financeiro/resultado-financeiro.model';
import { of, throwError } from 'rxjs';

describe('ResultadoFinanceiroEditComponent', () => {
  let component: ResultadoFinanceiroEditComponent;
  let fixture: ComponentFixture<ResultadoFinanceiroEditComponent>;
  let resultadoFinanceiroService: ResultadoFinanceiroService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultadoFinanceiroEditComponent
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
    fixture = TestBed.createComponent(ResultadoFinanceiroEditComponent);
    component = fixture.componentInstance;
    resultadoFinanceiroService = TestBed.get(ResultadoFinanceiroService);
    authenticateService = new AuthenticationService();
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    component.resultadoFinanceiro = new ResultadoFinanceiroModel({
      ano: 2020,
      caminhoPdf: '.pdf',
      dataCadastro: new Date(),
      dataCorte: new Date(),
      id: 1,
      nomePdf: 'teste',
      titulo: 'Testando',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getResultadoFinanceiro', (done: DoneFn) => {
    component.usuario = new UserAuthenticateModel({ perfis: [] });
    spyOn(resultadoFinanceiroService, 'getById').and.returnValue(of(component.resultadoFinanceiro));
    component.getResultadoFinanceiro();
    fixture.detectChanges();
    expect(component.resultadoFinanceiro).not.toBeNull();
    done();
  });

  it('getResultadoFinanceiro dataCorte null', (done: DoneFn) => {
    component.resultadoFinanceiro.dataCorte = null;
    spyOn(resultadoFinanceiroService, 'getById').and.returnValue(of(component.resultadoFinanceiro));
    component.getResultadoFinanceiro();
    fixture.detectChanges();
    expect(component.resultadoFinanceiro).not.toBeNull();
    done();
  });

  it('getErrors', () => {
    const descricao = component.resultadoFinanceiroForm.controls.titulo;
    const result = component.getErrors(descricao);
    expect(result).not.toBeNull();
  });

  it('updateFileName', () => {
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
    spyOn(resultadoFinanceiroService, 'getById').and.returnValue(of(component.resultadoFinanceiro));
    component.getResultadoFinanceiro();
    fixture.detectChanges();
    spyOn(resultadoFinanceiroService, 'put').and.returnValue(of(null));
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
