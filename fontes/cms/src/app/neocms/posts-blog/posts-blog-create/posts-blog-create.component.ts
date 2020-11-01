import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { faTimes, faCheck, faUpload, faPlus, faArrowCircleLeft, faCheckCircle, faCog } from '@fortawesome/free-solid-svg-icons';
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
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DatePipe, formatDate } from '@angular/common';
import { format } from 'util';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { environment } from 'src/environments/environment';



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
  faCog = faCog;
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
  arquivoNome = '';
  arquivoNomeImagemPequena = '';
  arquivos: File[] = [];
  imagemGrande: File;
  imagemPequena: File;
  submitted: boolean;
  user: UserAuthenticateModel;

  imageChangedEvent: any;
  imageChangedEventMobile: any;
  croppedImage: any;
  croppedImageMobile: any;
  blob: File;
  nomeDaImagem: any;
  areaSelecImagem: string;
  file: ImageData;
  fileMobile: Blob;
  fileData: File = null;
  previewUrl: any = null;
  previewUrlImagemPequena: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  isPostAtivo = false;
  isPostDestaque = false;

  private readonly API_ENDPOINT = environment.API;

  constructor(
    private authenticateService: AuthenticationService,
    private categoriasService: CategoriasService,
    private postsBlogService: PostsBlogService,
    private tagService: TagService,
    private fb: FormBuilder,
    private router: Router,
    private localeService: BsLocaleService,
    private datepipe: DatePipe
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
      descricao: ['', [Validators.required, Validators.maxLength(4000), FormControlError.noWhitespaceValidator]],
      dataPublicacao: ['', [Validators.required]],
      dataExpiracao: [''],
      arquivo: [''],
      caminhoImagem: [this.API_ENDPOINT + '/Src/Images/Post/'],
      nomeImagem: [''],
      destaque: ['', [Validators.required, FormControlError.noWhitespaceValidator],],
      ativo: ['', [Validators.required, FormControlError.noWhitespaceValidator],],
      visualizacoes: [''],
      tituloPaginaSEO: ['', [Validators.required, Validators.maxLength(150), FormControlError.noWhitespaceValidator]],
      descricaoPaginaSEO: ['', [Validators.required, Validators.maxLength(200), FormControlError.noWhitespaceValidator]],
      categoriaId: ['', Validators.required],
      postTag: this.fb.array([]),
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

      this.postsBlogForm.controls.dataPublicacao.setValue(dataPublicacao);

      const dataExpiracaoElement: any = document.querySelector('#dataExpiracao');
      const dataExpiracao: Date = dataExpiracaoElement.value;

      if (dataExpiracao) {
        this.postsBlogForm.controls.dataExpiracao.setValue(dataExpiracao);
      } else {
        this.postsBlogForm.controls.dataExpiracao.setValue('');
      }

      if(this.imagemGrande != undefined)
      {
        this.postsBlogForm.controls.arquivo.setValue(this.imagemGrande);
        this.postsBlogForm.controls.nomeImagem.setValue(this.arquivoNome);
      }
      else{
        this.postsBlogForm.controls.arquivo = [];
      }

      const model = new PostsBlogCreateModel(this.postsBlogForm.value);
      this.postsBlogService.post(model)
        .subscribe(() =>
          this.router.navigate(['/neocms/posts-blog/index'])
        );
    }
  }

  updateFileName(arquivo: any) {
    this.arquivoNome = '';
    if (arquivo.length > 0) {
      this.arquivoNome = arquivo[0].name;
      this.arquivos.push(arquivo[0]);
    }
  }

  fileProgress(arquivo: any) {
    //this.arquivo = <File>fileInput.target.files[0];
    this.imagemGrande = arquivo[0];
    this.arquivoNome = this.imagemGrande.name;
    this.preview();
  }

  fileProgressImagemPequena(arquivo: any) {
    //this.arquivo = <File>fileInput.target.files[0];
    this.imagemPequena = arquivo[0];
    this.arquivoNomeImagemPequena = this.imagemPequena.name;
    this.previewImagemPequena();
  }

  preview() {
    // Show preview
    var mimeType = this.imagemGrande.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.imagemGrande);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      this.imagemGrande = this.previewUrl;
    }
  }

  previewImagemPequena() {
    // Show preview
    var mimeType = this.imagemPequena.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.imagemPequena);
    reader.onload = (_event) => {
      this.previewUrlImagemPequena = reader.result;
      this.imagemPequena = this.previewUrlImagemPequena;
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


  changeCategoria(categoria) {
   if(categoria.value == 'Administrar' ){
      this.router.navigate(['/neocms/posts-blog/categorias/index']);
   }
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(event);
  }

  fileChangeEventMobile(event: any): void {
    this.imageChangedEventMobile = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const file = this.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name,
    )
    console.log(file)

   let areaNome = JSON.stringify(file).replace(/['"]+/g, '');
  //  console.log(areaNome.toString().)
  //  this.bannerForm.get('arquivo').setValue(areaNome);
  //  console.log(this.bannerForm.get('arquivo').setValue(areaNome));

  }



  base64ToFile(data, filename) {
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

}
