import { Component, OnInit } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UploadAdapter } from './../../../../../src/plugins/upload-adapter';
import { NoticiaService } from '../noticia.service';
import { FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NoticiaTipoModel } from './../../../../../src/models/noticia-tipo/noticia-tipo.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../../../../src/app/authentication/authentication.service';
import { UserAuthenticateModel } from './../../../../../src/models/user-authenticate.model';
import { TagService } from '../tag/tag.service';
import { TagModel } from './../../../../../src/models/tag/tag.model';
import { FormControlError } from './../../../../../src/utils/form-control-error';
import { NoticiaModel } from './../../../../../src/models/noticia/noticia.model';
import { BlocoModel } from './../../../../../src/models/bloco/bloco.model';
import { TipoService } from '../tipo/tipo.service';
import { NoticiaUpdateModel } from './../../../../../src/models/noticia/noticia-update-model';

@Component({
  selector: 'app-noticia-edit',
  templateUrl: './noticia-edit.component.html',
  styleUrls: ['./noticia-edit.component.scss']
})
export class NoticiaEditComponent implements OnInit {
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
  noticia: NoticiaModel;
  ressultTipo: any;

  constructor(
    private noticiaService: NoticiaService,
    private noticiaTipoService: TipoService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private tagService: TagService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user = this.authenticateService.state;
    this.createForm();
    this.getTipos();
  }

  getNoticia() {
    const id = this.route.snapshot.paramMap.get('id');
    this.noticiaService
      .getById(id)
      .subscribe(noticia => {
        this.noticia = noticia;
        this.arquivoNome = noticia.nomeImagem;
        this.updateForm();

        this.optionsDate.startDate = new Date(noticia.dataPublicacao);
        this.optionsDate.startDate = noticia.dataExpiracao ? new Date(noticia.dataExpiracao) : null;
      });
  }

  getTags() {
    this.tagService.getAll().subscribe(tags => {
      this.tags = tags;
      this.updateTags();
    });
  }

  getTipos() {
    this.noticiaTipoService
      .getAll(1, 100)
      .subscribe(tipos => {
        this.tipos = tipos;
        this.ressultTipo = tipos['result'];
        this.getNoticia();
      });
  }

  createForm() {
    this.noticiaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      subtitulo: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      descricaoPrevia: ['', [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      dataPublicacao: ['', [Validators.required]],
      dataExpiracao: [''],
      noticiaTipoId: ['', Validators.required],
      blocos: this.fb.array(
        [
          this.fb.group({
            titulo: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            subtitulo: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            descricao: ['', [Validators.required, Validators.maxLength(4000), FormControlError.noWhitespaceValidator]]
          })
        ],
        [Validators.required]
      ),
      tags: this.fb.array([], [Validators.required]),
      arquivo: ['']
    });
  }

  updateForm() {
    this.noticiaForm = this.fb.group({
      id: [this.noticia.id, [Validators.required]],
      titulo: [this.noticia.titulo, [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      subtitulo: [this.noticia.subtitulo, [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      descricaoPrevia: [this.noticia.descricaoPrevia, [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      dataPublicacao: [this.noticia.dataPublicacao, [Validators.required]],
      dataExpiracao: [this.noticia.dataExpiracao],
      noticiaTipoId: [this.noticia.noticiaTipo.id, Validators.required],
      blocos: this.fb.array([], [Validators.required]),
      tags: this.fb.array([], [Validators.required]),
      arquivo: ['']
    });

    this.updateBlocos();
    this.getTags();
  }

  updateBlocos() {
    this.noticia.bloco.forEach(bloco => {
      this.addBloco(bloco);
    });
  }

  updateTags() {
    this.noticia.noticiaTag.forEach(tag => {
      this.toggleTag(tag);
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
    return this.noticiaForm.get('blocos') as FormArray;
  }

  get tagControls() {
    return this.noticiaForm.get('tags') as FormArray;
  }

  toggleTag(tag: TagModel) {
    const index = this.ressultTipo.findIndex(x => x.id === tag['result'].id);
    this.ressultTipo[index].selected = !this.ressultTipo[index].selected;
    this.manageTag(this.ressultTipo[index].id);
  }

  addBloco(bloco?) {
    if (!bloco) {
      bloco = new BlocoModel();
    }
    this.blocos.push(
      this.fb.group({
        id: [bloco.id],
        titulo: [bloco.titulo, [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
        subtitulo: [bloco.subtitulo, [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
        descricao: [bloco.descricao, [Validators.required, Validators.maxLength(4000), FormControlError.noWhitespaceValidator]]
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
      const model = new NoticiaUpdateModel(this.noticiaForm.value);
      this.noticiaService.put(model)
        .subscribe(() =>
          this.router.navigate(['/neocms/noticia/index'])
        );
    }
  }

  updateFileName(files: any) {
    this.arquivoNome = 'Selecione um arquivo';
    if (files.length > 0) {
      this.arquivoNome = files[0].name;
      this.arquivo = files[0];
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
