import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { faTimes, faCheck, faUpload, faPlus, faArrowCircleLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
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
import { BsLocaleService } from 'ngx-bootstrap/datepicker';



@Component({
  selector: 'app-posts-blog-create',
  templateUrl: './posts-blog-create.component.html',
  styleUrls: ['./posts-blog-create.component.scss']
})
export class PostsBlogCreateComponent implements OnInit {
  locale = 'pt-br';
  editor = DecoupledEditor;
  postsBlogForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  faArrowCircleLeft = faArrowCircleLeft;
  faCheckCircle = faCheckCircle;
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


  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  isPostAtivo = false;
  isPostDestaque = false;

  constructor(
    private authenticateService: AuthenticationService,
    private categoriasService: CategoriasService,
    private postsBlogService: PostsBlogService,
    private tagService: TagService,
    private fb: FormBuilder,
    private router: Router,
    private localeService: BsLocaleService
  ) {
    this.localeService.use(this.locale);
  }

  ngOnInit() {
    this.user = this.authenticateService.state;
    this.categoriasService.getAll().subscribe(categorias => this.categorias = categorias);
    this.tagService.getAll().subscribe(tags => this.tags = tags);

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
      descricaoPaginaSEO: ['', [Validators.required, Validators.maxLength(200), FormControlError.noWhitespaceValidator]],
      categoriaId: ['', Validators.required],
      postTag: this.fb.array([]),
      descricao: ['', [Validators.required, Validators.maxLength(4000), FormControlError.noWhitespaceValidator]],
      arquivo: [''],
      caminhoImagem: ['assets/img'],
      nomeImagem: ['']
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
    const dataPublicacao: Date = dataPublicacaoElement.value;

    this.validateDate(dataPublicacao);

    this.submitted = true;
    if (this.postsBlogForm.valid) {
      const dataExpiracaoElement: any = document.querySelector('#dataExpiracao');

      const dataExpiracao: Date = dataExpiracaoElement.value;

      this.postsBlogForm.controls.dataPublicacao.setValue(dataPublicacao);

      if (dataExpiracao) {
        this.postsBlogForm.controls.dataExpiracao.setValue(dataExpiracao);
      } else {
        this.postsBlogForm.controls.dataExpiracao.setValue('');
      }

      this.postsBlogForm.controls.arquivo.setValue(this.arquivo);
      this.postsBlogForm.controls.nomeImagem.setValue(this.arquivoNome);
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

  fileProgress(arquivos: any) {
    //this.arquivo = <File>fileInput.target.files[0];
    this.arquivo = arquivos[0];
    this.arquivoNome = this.arquivo.name;
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.arquivo.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();      
    reader.readAsDataURL(this.arquivo); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
      this.arquivo = this.previewUrl;
    }
  }

  validateDate(data: Date) {
    if (!data) {
      this.f.dataPublicacao.setErrors('Data inválida!');
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
