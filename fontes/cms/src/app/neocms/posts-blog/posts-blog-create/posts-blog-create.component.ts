import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import * as BulmaCalendar from 'src/assets/js/bulma-calendar';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { FormControlError } from 'src/utils/form-control-error';
import { PostsBlogService } from '../posts-blog.service';
import { PostsBlogModel } from 'src/models/posts-blog/posts-blog.model';
import { CategoriasModel } from 'src/models/categorias/categorias.model';
import { CategoriasService } from '../categorias/categorias.service';
import { PostsBlogCreateModel } from 'src/models/posts-blog/posts-blog-create.model';
import { TagModel } from 'src/models/tag/tag.model';
import { TagService } from '../tag/tag.service';
import { PostsUploadAdapter } from 'src/plugins/posts-upload-adapter';


@Component({
  selector: 'app-posts-blog-create',
  templateUrl: './posts-blog-create.component.html',
  styleUrls: ['./posts-blog-create.component.scss']
})
export class PostsBlogCreateComponent implements OnInit {
  editor = DecoupledEditor; 
  postsBlogForm;
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
  postsBlog: PostsBlogModel[] = [];
  tags: TagModel[] = [];
  categorias: CategoriasModel[] = [];
  arquivoNome = 'Selecione um arquivo';
  arquivo: File;
  submitted: boolean;
  user: UserAuthenticateModel;

  isPostAtivo = false;
  isPostDestaque = false;

  constructor(
    private authenticateService: AuthenticationService,
    private categoriasService: CategoriasService,
    private postsBlogService: PostsBlogService,
    private tagService: TagService,    
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.authenticateService.state;
    this.categoriasService.getAll().subscribe(categorias => this.categorias = categorias);
    this.tagService.getAll().subscribe(tags => this.tags = tags);

    BulmaCalendar.attach('[type="date"]', this.optionsDate);
    this.createForm();
  }

  createForm() {
    this.postsBlogForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      subtitulo: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      descricaoPrevia: ['', [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      dataPublicacao: ['', [Validators.required]],
      dataExpiracao: [''],
      destaque: ['0', [Validators.required, FormControlError.noWhitespaceValidator],],
      ativo: ['0', [Validators.required, FormControlError.noWhitespaceValidator],],
      tituloPaginaSEO: ['', [Validators.required, Validators.maxLength(150), FormControlError.noWhitespaceValidator]],
      descricaoPaginaSEO : ['', [Validators.required, Validators.maxLength(200), FormControlError.noWhitespaceValidator]],
      categoriaId: ['', Validators.required],
      postTag: this.fb.array([], [Validators.required]), 
      descricao: ['', [Validators.required, Validators.maxLength(4000), FormControlError.noWhitespaceValidator]],     
      arquivo: ['']
    });
  }

  onReady(eventData: any) {
    eventData.ui.getEditableElement().parentElement.insertBefore(
      eventData.ui.view.toolbar.element,
      eventData.ui.getEditableElement()
    );
    
    eventData.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new PostsUploadAdapter(loader, this.postsBlogService);
    };
  }

  get f() {
    return this.postsBlogForm.controls;
  }
  
  get tagControls() {
    return this.postsBlogForm.get('postTag') as FormArray;
  }

  onSubmit() {
    const dataPublicacaoElement: any = document.querySelector('#dataPublicacao');
    const dataPublicacao: Date = dataPublicacaoElement.bulmaCalendar.date.start;

    this.validateDate(dataPublicacao);

    this.submitted = true;
    if (this.postsBlogForm.valid) {
      const dataExpiracaoElement: any = document.querySelector('#dataExpiracao');

      const dataExpiracao: Date = dataExpiracaoElement.bulmaCalendar.date.start;

      this.postsBlogForm.controls.dataPublicacao.setValue(dataPublicacao.toISOString());

      if (dataExpiracao) {
        this.postsBlogForm.controls.dataExpiracao.setValue(dataExpiracao.toISOString());
      } else {
        this.postsBlogForm.controls.dataExpiracao.setValue('');
      }

      this.postsBlogForm.controls.arquivo.setValue(this.arquivo);
      const model = new PostsBlogCreateModel(this.postsBlogForm.value);
      this.postsBlogService.post(model)
        .subscribe(() => 
          this.router.navigate(['/neocms/posts-blog'])
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

  toggleTag(tag: TagModel) {
    const index = this.tags.findIndex(x => x.id === tag.id);
    this.tags[index].selected = !this.tags[index].selected;
    this.manageTag(this.tags[index].id);
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

  changeStatusPost(value: string, selected: boolean) {
    this.f.ativo.setValue(value);
    this.isPostAtivo = selected;
  }

  changeStatusDestaque(value: string, selected: boolean) {
    this.f.destaque.setValue(value);
    this.isPostDestaque = selected;
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }

}
