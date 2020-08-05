import { Component, OnInit } from '@angular/core';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { TipoService } from '../tipo.service';
import { NoticiaTipoCreateModel } from 'src/models/noticia-tipo/noticia-tipo-create.model';

@Component({
  selector: 'app-tipo-create',
  templateUrl: './tipo-create.component.html',
  styleUrls: ['./tipo-create.component.scss']
})
export class TipoCreateComponent implements OnInit {
  noticiaTipoForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;

  constructor(
    private noticiaTipoService: TipoService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;

    this.createForm();
  }

  createForm() {
    this.noticiaTipoForm = this.fb.group({
      tipos: this.fb.array([
        this.fb.group({
          descricao: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
        })
      ])
    });
  }

  get f() {
    return this.noticiaTipoForm.controls;
  }

  get noticiaTipos() {
    return this.f.tipos;
  }

  addNoticiaTipo() {
    this.noticiaTipos.push(
      this.fb.group({
        descricao: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      })
    );
  }

  removeNoticiaTipo(index: number) {
    this.noticiaTipos.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
    if (this.noticiaTipoForm.valid) {
      const noticiaTiposToCreate = [];
      this.noticiaTipos.controls.forEach(tipo => {
        noticiaTiposToCreate.push(new NoticiaTipoCreateModel(tipo.value));
      });

      this.noticiaTipoService.post(noticiaTiposToCreate)
        .subscribe(() =>
          this.router.navigate(['/neocms/noticia/tipo'])
        );
    }
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }
}
