import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, AbstractControl, FormGroup } from '@angular/forms';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { FormControlError } from 'src/utils/form-control-error';
import { PostsBlogService } from '../posts-blog.service';
import { PostBlogModel } from 'src/models/posts-blog/posts-blog.model';
import { CategoriasModel } from 'src/models/categorias/categorias.model';
import { CategoriasService } from '../categorias/categorias.service';
import { PostsBlogCreateModel } from 'src/models/posts-blog/posts-blog-create.model';
import { TagModel, TagModelList } from 'src/models/tag/tag.model';
import { TagService } from '../tag/tag.service';
import { PostsUploadAdapter } from 'src/plugins/posts-upload-adapter';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'app-posts-blog-create',
    templateUrl: './posts-blog-create.component.html',
    styleUrls: ['./posts-blog-create.component.scss']
})
export class PostsBlogCreateComponent implements OnInit {
    locale = 'pt-br';
    postsBlogForm: FormGroup;
    faTag = faTag;
    postsBlog: PostBlogModel[] = [];
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
        private toastrService: ToastrService
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
    private createForm() {
        this.postsBlogForm = this.fb.group({
            titulo: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            subtitulo: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            descricaoPrevia: ['', [Validators.required,Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
            descricao: ['', [Validators.required, FormControlError.noWhitespaceValidator]],
            dataPublicacao: ['', [Validators.required]],
            dataExpiracao: [''],
            arquivo: [''],
            nomeImagem: [''],
            destaque: ['0', [Validators.required, FormControlError.noWhitespaceValidator],],
            ativo: ['0', [Validators.required, FormControlError.noWhitespaceValidator],],
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

        console.log(this.postsBlogForm)
        if (this.postsBlogForm.valid) {

            this.postsBlogForm.controls.dataPublicacao.setValue(dataPublicacao);

            if (this.imagemGrande != undefined) {
                this.postsBlogForm.controls.arquivo.setValue(this.imagemGrande);
                this.postsBlogForm.controls.nomeImagem.setValue(this.arquivoNome);
            }
            else {
                this.postsBlogForm.controls.arquivo.setValue([]);
            }

            const model = new PostsBlogCreateModel(this.postsBlogForm.value);
            this.postsBlogService.post(model)
                .subscribe(() => {
                    this.toastrService.success('Post cadastrado com sucesso!!!');
                    this.router.navigate(['/neocms/posts-blog/index']);
                }, error => {
                    let message = '';
                    if (error.error) {
                        message = error.error.message || 'Erro Interno no servidor';
                    } else {
                        message = error.message || 'Erro Interno';
                    }
                    this.toastrService.error(message);
                });
        }
    }

    /*  ////////////////////
        //  Image Change
    */  ///////////////////
    fileProgress(arquivo: FileList) {
        this.imagemGrande = arquivo[0];
        this.arquivoNome = this.imagemGrande.name;
        this.preview();
    }

    /*  ////////////////////
        //  Preview Image
    */  ///////////////////
    private preview() {
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
    private validateDate(data: Date) {
        if (!data) {
            this.f.dataPublicacao.setErrors({
                invalidDate: true
            });
        }
    }

    /*  ////////////////////
        //  Preview Image
    */  ///////////////////
    toggleTag(tag: TagModel) {
        const index = this.resultTag.result.findIndex(x => x.id === tag.id);
        this.resultTag.result[index].selected = !this.resultTag.result[index].selected;
        this.manageTag(this.resultTag.result[index].id);
    }

    /*  ////////////////////
    //  Add or remove a tag from the post form.
    */  ///////////////////
    private manageTag(id: number) {
        const index = this.tagControls.controls.findIndex((item) => {
            return item.value.tagId === id;
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
    private addTag(id: number) {
        this.tagControls.push(
            this.fb.group({
                tagId: [id, [Validators.required]]
            })
        );
    }

    /*  ////////////////////
    //  Remove a tag to the post
    */  ///////////////////
    private removeTag(index: number) {
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
    getErrors(control: AbstractControl, controlName?: string) {
        return FormControlError.GetErrors(control, controlName);
    }

}
