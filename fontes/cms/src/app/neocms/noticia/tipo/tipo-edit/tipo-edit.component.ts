import { Component, OnInit } from '@angular/core';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { NoticiaTipoCreateModel } from 'src/models/noticia-tipo/noticia-tipo-create.model';
import { TipoService } from '../tipo.service';
import { NoticiaTipoModel } from 'src/models/noticia-tipo/noticia-tipo.model';

@Component({
  selector: 'app-tipo-edit',
  templateUrl: './tipo-edit.component.html',
  styleUrls: ['./tipo-edit.component.scss']
})
export class TipoEditComponent implements OnInit {
  noticiaTipoForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  noticiaTipo: NoticiaTipoModel;

  constructor(
    private noticiaTipoService: TipoService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
    this.getNoticiaTipo();
  }

  getNoticiaTipo() {
    const id = this.route.snapshot.paramMap.get('id');

    this.noticiaTipoService
      .getById(id)
      .subscribe(tag => {
        this.noticiaTipo = tag;
        this.updateForm();
      });

  }

  createForm() {
    this.noticiaTipoForm = this.fb.group({
      id: ['', [Validators.required]],
      descricao: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
    });
  }

  updateForm() {
    this.noticiaTipoForm = this.fb.group({
      id: [this.noticiaTipo.id, [Validators.required]],
      descricao: [this.noticiaTipo.descricao, [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
    });
  }

  get f() {
    return this.noticiaTipoForm.controls;
  }

  get noticiaTipos() {
    return this.f.tags;
  }

  onSubmit() {
    this.submitted = true;
    if (this.noticiaTipoForm.valid) {
      const tagsToUpdate = [];
      tagsToUpdate.push(new NoticiaTipoCreateModel(this.noticiaTipoForm.value));

      this.noticiaTipoService.put(tagsToUpdate)
        .subscribe(() =>
          this.router.navigate(['/neocms/noticia/tipo'])
        );
    }
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }
}
