import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { faTimes, faCheck, faUpload, faPlus, faArrowCircleLeft, faCheckCircle, faCog, faTag } from '@fortawesome/free-solid-svg-icons';
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
import { TagModel, TagModelList } from 'src/models/tag/tag.model';
import { TagService } from '../tag/tag.service';
import { PostsUploadAdapter } from 'src/plugins/posts-upload-adapter';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
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
    faTag = faTag;
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
    resultTag: TagModelList;

    constructor(
        private authenticateService: AuthenticationService,
        private categoriasService: CategoriasService,
        private postsBlogService: PostsBlogService,
        private tagService: TagService,
        private fb: FormBuilder,
        private router: Router,
        private bsLocaleService: BsLocaleService,
    ) {
        this.bsLocaleService.use(this.locale);
    }

    ngOnInit() {
        this.user = this.authenticateService.state;
        this.getCategories();
        this.getTags();
        this.createForm();
    }

    /*  ////////////////////
    //  Create form method
    */  ///////////////////
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
            postTag: this.fb.array([], Validators.compose([Validators.minLength(1)])),
        });
    }

    /*  ////////////////////
    //  Get categories method
    */  ///////////////////
    private async getCategories() {
        try {
            const categorias = await this.categoriasService
                .getAll(0, 100)
                .toPromise();
            this.categorias = categorias.result;
        } catch (error) {
            console.log(error)
        }
    }


    /*  ////////////////////
    //  Get last 1000 tags from API.
    */  ///////////////////
    private async getTags() {
        try {
            const tags = await this.tagService
                .getAll(0, 1000).toPromise();
            this.resultTag = tags;
        } catch (error) {
            console.log(error)
        }

    }

    /*  ////////////////////
    //  CkEditor onReady event callback handler.
    */  ///////////////////
    onReady(eventData: any) {
        eventData.ui.getEditableElement().parentElement.insertBefore(
            eventData.ui.view.toolbar.element,
            eventData.ui.getEditableElement()
        );

        eventData.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
            return new PostsUploadAdapter(loader, this.postsBlogService);
        };
    }

    /**
    * @memberof: PostsBlogCreateComponent
    * @description: Método para gerar o formControl
    */
    get f() {
        return this.postsBlogForm.controls;
    }

    /**
    * @memberof PostsBlogCreateComponent
    * @description Método para gerar o formArray
    */
    get tagControls() {
        return this.postsBlogForm.get('postTag') as FormArray;
    }

    /**
    * @memberof PostsBlogCreateComponent
    * @description Método que submete o formdata.
    */
    onSubmit() {
        const dataPublicacaoElement: any = document.querySelector('#dataPublicacao');
        const dataPublicacao: Date = dataPublicacaoElement.value;

        this.validateDate(dataPublicacao);

        this.submitted = true;
        if (this.postsBlogForm.valid) {

            this.postsBlogForm.controls.dataPublicacao.setValue(dataPublicacao);

            if (this.imagemGrande != undefined) {
                this.postsBlogForm.controls.arquivo.setValue(this.imagemGrande);
                this.postsBlogForm.controls.nomeImagem.setValue(this.arquivoNome);
            }
            else {
                this.postsBlogForm.controls.arquivo = [];
            }

            const model = new PostsBlogCreateModel(this.postsBlogForm.value);
            this.postsBlogService.post(model)
                .subscribe(() =>
                    this.router.navigate(['/neocms/posts-blog/index'])
                );
        }
    }

    /**
    * @memberof: PostsBlogCreateComponent
    * @description: Metodo que atualiza o nome do arquivo.
    */
    updateFileName(arquivo: any) {
        this.arquivoNome = '';
        if (arquivo.length > 0) {
            this.arquivoNome = arquivo[0].name;
            this.arquivos.push(arquivo[0]);
        }
    }

    /*  ////////////////////
        //  Image Change
    */  ///////////////////
    fileProgress(arquivo: any) {
        this.imagemGrande = arquivo[0];
        this.arquivoNome = this.imagemGrande.name;
        this.preview();
    }

    /*  ////////////////////
        //  Preview Image
    */  ///////////////////
    preview() {
        var mimeType = this.imagemGrande.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(this.imagemGrande);
        reader.onload = (_event) => {
            this.previewUrl = reader.result;
        }
    }

    /*  ////////////////////
        //  Preview Image
    */  ///////////////////
    validateDate(data: Date) {
        if (!data) {
            this.f.dataPublicacao.setErrors('Data inválida!');
        }
    }

    /*  ////////////////////
        //  Preview Image
    */  ///////////////////
    toggleTag(tag: TagModel) {
        const index = this.resultTag.result.findIndex(x => x.id === tag.id);
        this.resultTag[index].selected = !this.resultTag.result[index].selected;
        this.manageTag(this.resultTag[index].id);
    }

    /*  ////////////////////
    //  Add or remove a tag from the post form.
    */  ///////////////////
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

    /*  ////////////////////
    //  Add a tag to the post
    */  ///////////////////
    addTag(id: number) {
        this.tagControls.push(
            this.fb.group({
                tagId: [id, [Validators.required]]
            })
        );
    }

    /*  ////////////////////
    //  Remove a tag to the post
    */  ///////////////////
    removeTag(index: number) {
        this.tagControls.removeAt(index);
    }


    /*  ////////////////////
    //  Manage categories method
    */  ///////////////////
    manageCategories(categoria) {
        if (categoria.value == 'Administrar') {
            this.router.navigate(['/neocms/posts-blog/categorias/index']);
        }
    }

    /*  ////////////////////
        //  Change post status, to actived or deactived.
    */  ///////////////////
    changeStatusPost(value: string, selected: boolean) {
        this.f.ativo.setValue(value);
        this.isPostAtivo = selected;
    }

    /*  ////////////////////
        //  Change post highlight status, to actived or deactived.
    */  ///////////////////
    changeStatusDestaque(value: string, selected: boolean) {
        this.f.destaque.setValue(value);
        this.isPostDestaque = selected;
    }

    /*  ////////////////////
        //  Change form control errors
    */  ///////////////////
    getErrors(control: AbstractControl) {
        return FormControlError.GetErrors(control);
    }
}
