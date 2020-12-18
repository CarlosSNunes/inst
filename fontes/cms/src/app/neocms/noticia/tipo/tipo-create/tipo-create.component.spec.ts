import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCreateComponent } from './tipo-create.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TipoService } from '../tipo.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of } from 'rxjs';

describe('TipoCreateComponent', () => {
  let component: TipoCreateComponent;
  let fixture: ComponentFixture<TipoCreateComponent>;
  let tipoService: TipoService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TipoCreateComponent],
      imports: [
        FontAwesomeModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCreateComponent);
    component = fixture.componentInstance;
    tipoService = TestBed.get(TipoService);
    authenticateService = TestBed.get(AuthenticationService);
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addTag', () => {
    component.addNoticiaTipo();
    expect(component.noticiaTipos).not.toBeNull();
  });

  it('removeTag', () => {
    component.addNoticiaTipo();
    component.removeNoticiaTipo(1);
    expect(component.noticiaTipos).not.toBeNull();
  });

  it('getErrors', () => {
    const descricao = (component.noticiaTipos.get('0') as FormGroup).controls.descricao;
    const result = component.getErrors(descricao);
    expect(result).not.toBeNull();
  });

  it('onSubmit', () => {
    component.onSubmit();
    expect(component.noticiaTipoForm.valid).toEqual(false);
  });

  it('onSubmit', (done: DoneFn) => {
    spyOn(tipoService, 'post').and.returnValue(of(null));
    (component.noticiaTipos.get('0') as FormGroup).controls.descricao.setValue('descrição');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.noticiaTipoForm.valid).toEqual(true);
    done();
  });
});
