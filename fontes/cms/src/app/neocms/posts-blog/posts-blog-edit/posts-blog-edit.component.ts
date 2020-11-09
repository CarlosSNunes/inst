import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { faTimes, faCheck, faUpload, faPlus, faCog, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../../../../src/app/authentication/authentication.service';
import { UserAuthenticateModel } from './../../../../../src/models/user-authenticate.model';
import { FormControlError } from './../../../../../src/utils/form-control-error';
import { PostsBlogService } from '../posts-blog.service';
import { PostsBlogModel } from './../../../../../src/models/posts-blog/posts-blog.model';
import { CategoriasModel } from './../../../../../src/models/categorias/categorias.model';
import { CategoriasService } from '../categorias/categorias.service';
import { TagModel } from './../../../../../src/models/tag/tag.model';
import { TagService } from '../tag/tag.service';
import { PostsUploadAdapter } from './../../../../../src/plugins/posts-upload-adapter';
import { PostBlogUpdateModel } from './../../../../../src/models/posts-blog/posts-blog-update-model';
import { DatePipe, formatCurrency, formatDate } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { environment } from './../../../../../src/environments/environment';

@Component({
  selector: 'app-posts-blog-edit',
  templateUrl: './posts-blog-edit.component.html',
  styleUrls: ['./posts-blog-edit.component.scss']
})

export class PostsBlogEditComponent implements OnInit {
  editor = DecoupledEditor;
  dataPublicacao;
  postsBlogForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  faCog = faCog;
  faArrowCircleLeft = faArrowCircleLeft;
  postsBlog: PostsBlogModel[] = [];
  tags: TagModel[] = [];
  categorias: CategoriasModel[] = [];
  arquivoNome = 'Selecione um arquivo';
  arquivo: File;
  submitted: boolean;
  user: UserAuthenticateModel;
  postBlog: PostsBlogModel;
  isPostAtivo = false;
  isPostDestaque = false;

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  private readonly API_ENDPOINT = environment.API;

  resultPostBlog;
  resultTags;
  resultCategoria: any;

  constructor(
    private authenticateService: AuthenticationService,
    private categoriasService: CategoriasService,
    private postsBlogService: PostsBlogService,
    private tagService: TagService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private localeService: BsLocaleService
  ) { }

  ngOnInit() {
    this.localeService.use('pt-br')
    this.user = this.authenticateService.state;



    this.categoriasService
      .getAll(1, 100)
      .subscribe(categorias => {
        this.categorias = categorias;
        this.resultCategoria = categorias['result'];
      });


    this.tagService
      .getAll(1, 100)
      .subscribe(tags => {
        this.tags = tags;
        this.resultTags = tags['result'];
      });

    this.getPost()

    this.createForm();
  }

  get f() {
    return this.postsBlogForm.controls;
  }

  get tagControls() {
    return this.postsBlogForm.get('postTag') as FormArray;
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

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    this.postsBlogService
      .getById(id)
      .subscribe(postBlog => {
        this.postBlog = postBlog;
        this.resultPostBlog = postBlog['result'];

        const dataPublicacaoElement: any = document.querySelector('#dataPublicacao');
        this.postsBlogForm.controls.dataPublicacao.setValue(this.datepipe.transform(this.resultPostBlog.dataPublicacao, 'dd/MM/yyyy', 'en'));

        const dataPExpiracaoElement: any = document.querySelector('#dataExpiracao');
        dataPExpiracaoElement.value = this.resultPostBlog.dataExpiracao;
        this.postsBlogForm.controls.dataExpiracao.setValue(this.resultPostBlog.dataExpiracao);

        this.changeStatusPost(this.resultPostBlog.ativo, this.resultPostBlog.ativo == '1' ? true : false);
        this.changeStatusDestaque(this.resultPostBlog.destaque, this.resultPostBlog.destaque == '1' ? true : false);
        this.updateForm(this.resultPostBlog);
      });
  }

  getTags() {
    this.tagService
      .getAll(1, 100)
      .subscribe(tags => {
        this.tags = tags;
        this.resultTags = tags;
        this.updateTags();
      });
  }

  getCategorias() {
    this.categoriasService
      .getAll(1, 100)
      .subscribe(categorias => {
        this.categorias = categorias;
        this.resultCategoria = categorias['result'];
      });
  }

  changeCategoria(categoria) {
    if (categoria.value == 'Administrar') {
      this.router.navigate(['/neocms/posts-blog/categorias/index']);
    }
  }

  createForm() {

    this.postsBlogForm = this.fb.group({
      id: [''],
      titulo: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      subtitulo: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      descricaoPrevia: ['', [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      dataPublicacao: ['', [Validators.required]],
      dataExpiracao: [''],
      destaque: ['', [Validators.required, FormControlError.noWhitespaceValidator],],
      ativo: ['', [Validators.required, FormControlError.noWhitespaceValidator],],
      tituloPaginaSEO: ['', [Validators.required, Validators.maxLength(150), FormControlError.noWhitespaceValidator]],
      descricaoPaginaSEO: ['', [Validators.required, Validators.maxLength(200), FormControlError.noWhitespaceValidator]],
      categoriaId: ['', Validators.required],
      postTag: this.fb.array([]),
      descricao: ['', [Validators.required, Validators.maxLength(4000), FormControlError.noWhitespaceValidator]],
      arquivo: [''],
      caminhoImagem: [''],
      nomeImagem: [''],
    });

    //this.getTags();
    this.getCategorias();
  }

  updateForm(postBlog: PostsBlogModel['result']) {
    this.postsBlogForm = this.fb.group({
      id: [postBlog['0'].id],
      titulo: [postBlog['0'].titulo, [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      subtitulo: [postBlog['0'].subtitulo, [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      descricaoPrevia: [postBlog['0'].descricaoPrevia, [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      dataPublicacao: [postBlog['0'].dataPublicacao, [Validators.required]],
      dataExpiracao: [postBlog['0'].dataExpiracao],
      destaque: [postBlog['0'].destaque, [Validators.required, FormControlError.noWhitespaceValidator],],
      ativo: [postBlog['0'].ativo, [Validators.required, FormControlError.noWhitespaceValidator],],
      tituloPaginaSEO: [postBlog['0'].tituloPaginaSEO],
      descricaoPaginaSEO: [postBlog['0'].descricaoPaginaSEO, [FormControlError.noWhitespaceValidator]],
      categoriaId: [postBlog['0'].categoriaId, Validators.required],
      postTag: this.fb.array(postBlog['0'].postTag),
      descricao: [postBlog['0'].descricao, [Validators.required, Validators.maxLength(4000), FormControlError.noWhitespaceValidator]],
      arquivo: [''],
      caminhoImagem: [this.API_ENDPOINT + '/Src/Images/Post/'],
      nomeImagem: [postBlog['0'].nomeImagem]
    });

  }

  updateTags() {
    this.resultPostBlog.postTag.forEach(tag => {
      this.toggleTag(tag);
    });
  }

  toggleTag(tag: TagModel) {
    const index = this.resultTags.findIndex(x => x.id === tag['result'].id);
    this.resultTags[index].selected = !this.resultTags[index].selected;
    this.manageTag(this.resultTags[index].id);
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

      if (this.arquivo != undefined) {
        this.postsBlogForm.controls.arquivo.setValue(this.arquivo);
        this.postsBlogForm.controls.nomeImagem.setValue(this.arquivoNome);
      }
      else {
        this.postsBlogForm.controls.arquivo.setValue([]);
        this.postsBlogForm.controls.caminhoImagem.setValue('');
        this.postsBlogForm.controls.nomeImagem.setValue('');

      }

      const model = new PostBlogUpdateModel(this.postsBlogForm.value);
      this.postsBlogService.put(model)
        .subscribe(() =>
          this.router.navigate(['/neocms/posts-blog/index'])
        );
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
      this.f.dataPublicacao.setErrors(null);
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
}
