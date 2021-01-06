import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, AbstractControl, FormGroup } from '@angular/forms';
import { faTimes, faCheck, faUpload, faPlus, faCog, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../../../../src/app/authentication/authentication.service';
import { UserAuthenticateModel } from './../../../../../src/models/user-authenticate.model';
import { FormControlError } from './../../../../../src/utils/form-control-error';
import { PostsBlogService } from '../posts-blog.service';
import { CategoriasModel } from './../../../../../src/models/categorias/categorias.model';
import { CategoriasService } from '../categorias/categorias.service';
import { TagModel, TagModelList } from './../../../../../src/models/tag/tag.model';
import { TagService } from '../tag/tag.service';
import { PostsUploadAdapter } from './../../../../../src/plugins/posts-upload-adapter';
import { PostBlogUpdateModel } from './../../../../../src/models/posts-blog/posts-blog-update-model';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { environment } from './../../../../../src/environments/environment';
import { PostsTagCreateModel } from 'src/models/posts-blog/posts-tag-create.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-posts-blog-edit',
    templateUrl: './posts-blog-edit.component.html',
    styleUrls: ['./posts-blog-edit.component.scss']
})

export class PostsBlogEditComponent implements OnInit {
    dataPublicacao;
    postsBlogForm: FormGroup;
    faTimes = faTimes;
    faCheck = faCheck;
    faUpload = faUpload;
    faPlus = faPlus;
    faCog = faCog;
    faArrowCircleLeft = faArrowCircleLeft;
    tags: TagModel[] = [];
    categorias: CategoriasModel[] = [];
    arquivoNome = 'Selecione um arquivo';
    arquivo: File;
    submitted: boolean;
    user: UserAuthenticateModel;
    postBlog: PostBlogUpdateModel;
    isPostAtivo = false;
    isPostDestaque = false;

    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    private readonly API_ENDPOINT = environment.API;

    resultPostBlog: PostBlogUpdateModel;
    resultTags: TagModelList;
    resultCategoria: CategoriasModel[];
    userPermission: string;

    constructor(
        private authenticateService: AuthenticationService,
        private categoriasService: CategoriasService,
        private postsBlogService: PostsBlogService,
        private tagService: TagService,
        private fb: FormBuilder,
        private router: Router,
        private localeService: BsLocaleService,
        private activatedRoute: ActivatedRoute,
        private toastrService: ToastrService
    ) {
        this.createForm();
    }

    ngOnInit() {
        this.userPermission = JSON.parse(localStorage.getItem('user_token')).perfis[0].descricao;

        if(this.userPermission == 'Visualizador'){
            this.router.navigate(['dashboard'])
        }
        this.localeService.use('pt-br')
        this.user = this.authenticateService.state;

        this.activatedRoute.params.subscribe(async params => {
            if (params.slug) {
                await this.getTags();
                await this.getCategories();
                await this.getPost(params.slug);
            }
        });
    }

    /*  ////////////////////
    //  Create form method
    */  ///////////////////
    private createForm() {
        this.postsBlogForm = this.fb.group({
            id: [''],
            titulo: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            subtitulo: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            descricaoPrevia: ['', [Validators.required,Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
            dataPublicacao: [new Date().toISOString().substring(0, 10), [Validators.required]],
            dataExpiracao: [''],
            destaque: [false, [Validators.required, FormControlError.noWhitespaceValidator],],
            ativo: ['', [Validators.required, FormControlError.noWhitespaceValidator],],
            tituloPaginaSEO: ['', [Validators.required, Validators.maxLength(150), FormControlError.noWhitespaceValidator]],
            descricaoPaginaSEO: ['', [Validators.required, Validators.maxLength(200), FormControlError.noWhitespaceValidator]],
            categoriaId: ['', Validators.required],
            postTag: this.fb.array([], Validators.compose([Validators.minLength(1)])),
            descricao: ['', [Validators.required, FormControlError.noWhitespaceValidator]],
            arquivo: [''],
            caminhoImagem: [''],
            nomeImagem: [''],
        });
    }

    /*  ////////////////////
    //  Update form method
    */  ///////////////////
    private updateForm(postBlog: PostBlogUpdateModel) {
        const postTags = postBlog.postTag.map(postTag => ({ tagId: postTag.id }));

        const dataPublicacao = this.resultPostBlog.dataPublicacao && this.resultPostBlog.dataPublicacao != null ? new Date(this.resultPostBlog.dataPublicacao).toISOString().substring(0, 10) : undefined;

        const dataExpiracao = this.resultPostBlog.dataExpiracao && this.resultPostBlog.dataExpiracao != null ? new Date(this.resultPostBlog.dataExpiracao).toISOString().substring(0, 10) : undefined;

        this.postsBlogForm = this.fb.group({
            id: [postBlog.id],
            titulo: [postBlog.titulo, [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            subtitulo: [postBlog.subtitulo, [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            descricaoPrevia: [postBlog.descricaoPrevia, [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
            dataPublicacao: [dataPublicacao, [Validators.required]],
            dataExpiracao: [dataExpiracao,],
            destaque: [postBlog.destaque, [Validators.required, FormControlError.noWhitespaceValidator],],
            ativo: [postBlog.ativo, [Validators.required, FormControlError.noWhitespaceValidator],],
            tituloPaginaSEO: [postBlog.tituloPaginaSEO],
            descricaoPaginaSEO: [postBlog.descricaoPaginaSEO, [FormControlError.noWhitespaceValidator]],
            categoriaId: [postBlog.categoriaId, Validators.required],
            postTag: this.fb.array(postTags, Validators.compose([Validators.minLength(1)])),
            descricao: [postBlog.descricao, Validators.compose([Validators.required, FormControlError.noWhitespaceValidator])],
            arquivo: [''],
            caminhoImagem: [this.API_ENDPOINT + '/Src/Images/Post/'],
            nomeImagem: [postBlog.nomeImagem]
        });

        this.postsBlogForm.value.postTag.forEach(postTag => {
            this.verifyTag(postTag);
        });
    }

    /*  ////////////////////
    //  Get post method
    */  ///////////////////
    private async getPost(slug: string) {
        try {
            const postBlog = await this.postsBlogService
                .getBySlug(slug).toPromise()

            this.postBlog = postBlog;
            this.resultPostBlog = postBlog;

            this.updateForm(this.resultPostBlog);
            this.changeStatusPost(this.resultPostBlog.ativo, this.resultPostBlog.ativo == '1' ? true : false);
            this.changeStatusDestaque(this.resultPostBlog.destaque, this.resultPostBlog.destaque == '1' ? true : false);
            this.preview()
        } catch (error) {
            let message = '';
            if (error.error) {
                message = error.error.message || 'Erro Interno no servidor';
            } else {
                message = error.message || 'Erro Interno';
            }
            this.toastrService.error(message);
        }
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
            this.resultCategoria = categorias.result;
        } catch (error) {
            let message = '';
            if (error.error) {
                message = error.error.message || 'Erro Interno no servidor';
            } else {
                message = error.message || 'Erro Interno';
            }
            this.toastrService.error(message);
        }
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
    //  Get form controls
    */  ///////////////////
    get f() {
        return this.postsBlogForm.controls;
    }

    /*  ////////////////////
    //  Get form post tag controls
    */  ///////////////////
    get tagControls() {
        return this.postsBlogForm.get('postTag') as FormArray;
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

    /*  ////////////////////
    //  Get last 1000 tags from API.
    */  ///////////////////
    private async getTags() {
        try {
            const tags = await this.tagService
                .getAll(0, 1000).toPromise();
            this.tags = tags.result;
            this.resultTags = tags;
        } catch (error) {
            let message = '';
            if (error.error) {
                message = error.error.message || 'Erro Interno no servidor';
            } else {
                message = error.message || 'Erro Interno';
            }
            this.toastrService.error(message);
        }

    }

    /*  ////////////////////
    //  Verify the post tags with the last 1000 tags returned from the API.
    */  ///////////////////
    private verifyTag(postTag) {
        const tagIndex = this.resultTags.result.findIndex(tag => tag.id == postTag.tagId);
        if (tagIndex > -1) {
            this.resultTags.result[tagIndex].selected = true;
        } else {
            this.resultTags.result[tagIndex].selected = false;
        }
    }

    /*  ////////////////////
    //  Add or remove a tag from the post.
    */  ///////////////////
    toggleTag(tag: PostsTagCreateModel) {
        const index = this.resultTags.result.findIndex(x => x.id === tag.id);
        if (index > -1) {
            this.resultTags.result[index].selected = !this.resultTags.result[index].selected;
            this.manageTag(this.resultTags.result[index].id);
        }
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
    //  remove a tag from the post
    */  ///////////////////
    private removeTag(index: number) {
        this.tagControls.removeAt(index);
    }


    /*  ////////////////////
    //  Form submit
    */  ///////////////////
    onSubmit() {
        this.submitted = true;

        if (this.postsBlogForm.valid) {

            if (this.arquivo != undefined) {
                this.postsBlogForm.controls.arquivo.setValue(this.arquivo);
                this.postsBlogForm.controls.nomeImagem.setValue(this.arquivoNome);
            }
            else {
                this.postsBlogForm.controls.arquivo.setValue([]);
                this.postsBlogForm.controls.caminhoImagem.setValue('');
                this.postsBlogForm.controls.nomeImagem.setValue('');
            }

            let model = new PostBlogUpdateModel(this.postsBlogForm.value);

            model = {
                ...this.resultPostBlog,
                ...model,
            }

            this.postsBlogService.put(model)
                .subscribe(() => {
                    this.toastrService.success('Post editado com sucesso!!!');
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
    fileProgress(arquivos: FileList) {
        if (arquivos.length > 0) {
            this.arquivo = arquivos[0];
            this.arquivoNome = this.arquivo.name;
        } else {
            this.arquivo = undefined;
            this.arquivoNome = '';
        }
        this.preview();
    }

    /*  ////////////////////
        //  Preview Image
    */  ///////////////////
    private preview() {
        // Show preview
        if (this.arquivo != undefined && this.arquivo != null) {
            var mimeType = this.arquivo.type;
            if (mimeType.match(/image\/*/) == null) {
                return;
            }

            var reader = new FileReader();
            reader.readAsDataURL(this.arquivo);
            reader.onload = (_event) => {
                this.previewUrl = reader.result;
            }
        } else {
            this.previewUrl = this.resultPostBlog.caminhoCompleto;
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
