import { Component, OnInit } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UploadAdapter } from 'src/plugins/upload-adapter';
import { NoticiaService } from '../noticia.service';
import { FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NoticiaTipoModel } from 'src/models/noticia-tipo/noticia-tipo.model';
import { NoticiaCreateModel } from 'src/models/noticia/noticia-create.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { TagService } from '../tag/tag.service';
import { TagModel } from 'src/models/tag/tag.model';
import { FormControlError } from 'src/utils/form-control-error';
import { TipoService } from '../tipo/tipo.service';

@Component({
  selector: 'app-noticia-create',
  templateUrl: './noticia-create.component.html',
  styleUrls: ['./noticia-create.component.scss']
})
export class NoticiaCreateComponent implements OnInit {
  editor = CKEditorModule;
  noticiaForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  optionsDate = {
    type: 'date',
    dateFormat: 'DD/MM/YYYY',
    displayMode: 'default',
    lang: 'pt',
    cancelLabel: 'Cancelar',
    clearLabel: 'Limpar',
    todayLabel: 'Hoje',
    nowLabel: 'Agora',
    validateLabel: 'Validar',
    minDate: new Date(),
    startDate: new Date(),
    color: 'dark'
  };
  tipos: NoticiaTipoModel[] = [];
  tags: TagModel[] = [];
  arquivoNome = 'Selecione um arquivo';
  arquivo: File;
  submitted: boolean;
  user: UserAuthenticateModel;

  constructor(
    private noticiaService: NoticiaService,
    private noticiaTipoService: TipoService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.user = this.authenticateService.state;
    this.noticiaTipoService.getAll().subscribe(tipos => this.tipos = tipos);
    this.tagService.getAll().subscribe(tags => this.tags = tags);

    this.createForm();
  }

  createForm() {
    this.noticiaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      subtitulo: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      descricaoPrevia: ['', [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      dataPublicacao: ['', [Validators.required]],
      dataExpiracao: [''],
      noticiaTipoId: ['', Validators.required],
      bloco: this.fb.array(
        [
          this.fb.group({
            titulo: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            subtitulo: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            descricao: ['', [Validators.required, Validators.maxLength(4000), FormControlError.noWhitespaceValidator]]
          })
        ],
        [Validators.required]
      ),
      noticiaTag: this.fb.array([], [Validators.required]),
      arquivo: ['']
    });
  }

  onReady(eventData: any) {
    eventData.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new UploadAdapter(loader, this.noticiaService);
    };
  }

  get f() {
    return this.noticiaForm.controls;
  }

  get blocos() {
    return this.noticiaForm.get('bloco') as FormArray;
  }

  get tagControls() {
    return this.noticiaForm.get('noticiaTag') as FormArray;
  }

  toggleTag(tag: TagModel) {
    const index = this.tags.findIndex(x => x.id === tag.id);
    this.tags[index].selected = !this.tags[index].selected;
    this.manageTag(this.tags[index].id);
  }

  addBloco() {
    this.blocos.push(
      this.fb.group({
        titulo: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
        subtitulo: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
        descricao: ['', [Validators.required, Validators.maxLength(4000), FormControlError.noWhitespaceValidator]]
      })
    );
  }

  removeBloco(index: number) {
    this.blocos.removeAt(index);
  }

  manageTag(id: number) {
    const index = this.tagControls.controls.findIndex((item, idx) => {
      return item.get('tagId').value === id;
    });

    if (index >= 0) {
      this.removeTag(index);
    } else {
      this.addTag(id);
    }
  }

  addTag(id: number) {
    this.tagControls.push(
      this.fb.group({
        tagId: [id, [Validators.required]]
      })
    );
  }

  removeTag(index: number) {
    this.tagControls.removeAt(index);
  }

  onSubmit() {
    const dataPublicacaoElement: any = document.querySelector('#dataPublicacao');
    const dataPublicacao: Date = dataPublicacaoElement.bulmaCalendar.date.start;

    this.validateDate(dataPublicacao);

    this.submitted = true;
    if (this.noticiaForm.valid) {
      const dataExpiracaoElement: any = document.querySelector('#dataExpiracao');

      const dataExpiracao: Date = dataExpiracaoElement.bulmaCalendar.date.start;

      this.noticiaForm.controls.dataPublicacao.setValue(dataPublicacao.toISOString());

      if (dataExpiracao) {
        this.noticiaForm.controls.dataExpiracao.setValue(dataExpiracao.toISOString());
      } else {
        this.noticiaForm.controls.dataExpiracao.setValue('');
      }

      this.noticiaForm.controls.arquivo.setValue(this.arquivo);
      const model = new NoticiaCreateModel(this.noticiaForm.value);
      this.noticiaService.post(model)
        .subscribe(() =>
          this.router.navigate(['/neocms/noticia/index'])
        );
    }
  }

  updateFileName(arquivos: any) {
    this.arquivoNome = 'Selecione um arquivo';
    if (arquivos.length > 0) {
      this.arquivoNome = arquivos[0].name;
      this.arquivo = arquivos[0];
    }
  }

  validateDate(data: Date) {
    if (data) {
      this.f.dataPublicacao.setErrors(null);
    }
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }
}
