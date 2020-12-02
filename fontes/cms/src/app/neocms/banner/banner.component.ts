/**========================================================================
 **                            BANNER COMPONENT

 //* INFO: Componente de Listagem de Banners
 *========================================================================**/

import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BannerModel } from 'src/models/banner/banner.model';
import { BannerService } from './banner.service';
import { faPencilAlt, faTrash, faPlus, faArrowsAltV, faEllipsisV, faEye, faClone } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BannerCreateModel } from 'src/models/banner/banner-create.model';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
// import { UserAuthenticateModel } from 'src/models/user-authenticate.model';


@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
    @Input() bannerAtivo: boolean;
    //Icons 
    faArrowsAltV = faArrowsAltV;
    faClone = faClone;
    faEllipsisV = faEllipsisV;
    faEye = faEye;
    faPencilAlt = faPencilAlt;
    faPlus = faPlus;
    faTrash = faTrash;
    //External References
    apiPath = environment.API;
    banners: BannerModel[] = [];
    banner: BannerModel;
    bannerForm: FormGroup;
    modalRef: BsModalRef;
    // usuario: UserAuthenticateModel;
    //Internal References
    bannerCount: number = 0;
    bannerResult: any;
    contador = 4;
    loaded: boolean;
    message: string;
    paginaAtual = 0;
    showBannerDelete: boolean;
    thumbnail: string;


    constructor(
        // private authenticationService: AuthenticationService,
        private bannerService: BannerService,
        private fb: FormBuilder,
        private modalService: BsModalService,
        private toastrService: ToastrService,
    ) { }

    ngOnInit() {
        // this.usuario = this.authenticationService.state;

        this.getBanners();
    }

    deleteBanner() {
    }

    get f() {
        return this.bannerForm.controls;
    }

    //TODO: Criar Endpoint para Duplicação de Banners 
    private duplicarBanner(banner: BannerModel) {
        this.bannerForm = this.fb.group({
            area: [banner.area],
            descricao: [banner.descricao],
            linkExterno: [banner.linkExterno],
            nomeImageMobile: [banner.nomeImagemMobile],
            nomeImagem: [banner.nomeImagemDesktop],
            nomeLink: [banner.nomeLink],
            rota: [banner.rota],
            subtitulo: [banner.subtitulo],
            tempoExibicao: [banner.tempoExibicao],
            titulo: [banner.titulo],
        });

        console.log(this.bannerForm);
        const newBanner = new BannerCreateModel(this.bannerForm.value);
        this.bannerService.post(newBanner)
            .subscribe(() => {
            })
            .add();
    }
    openModalDuplicarBanner(template: TemplateRef<BannerModel>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    }

    confirmDuplicar(banner: BannerModel): void {

        this.duplicarBanner(banner);
        this.modalRef.hide();
    }

    openBannerDelete(banner: BannerModel) {
        this.banner = banner;
        this.showBannerDelete = true;
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }

    confirm(id: number): void {
        this.bannerService
            .delete(id)
            .subscribe(_ => {
                this.message = 'Banner:' + id + ' deletada com sucesso!';
                this.modalRef.hide();
                this.toastrService.success('Banner deletado com sucesso!')
            }, (error) => {
                let message = '';
                if (error.error) {
                    message = error.error.message || 'Erro Interno no servidor';
                } else {
                    message = error.message || 'Erro Interno';
                }
                this.toastrService.error(message);
            });

    }

    decline(): void {
        this.modalRef.hide();
    }


    getBanners() {
        const offset = (this.paginaAtual - 1) * this.contador;
        this.bannerService
            .getAll(offset, this.contador)
            .subscribe(banners => {
                this.loaded = true;
                this.bannerResult = banners.result
                this.bannerCount = banners.count;
                console.log(this.bannerResult);
                this.bannerResult.caminhoCompletoDesktop;
            },
                error => {
                    let message = '';
                    if (error.error) {
                        message = error.error.message || 'Erro Interno no servidor';
                    } else {
                        message = error.message || 'Erro Interno';
                    }
                    this.toastrService.error(message);
                    this.loaded = true;
                });
    }

    onPageChange(page: number) {
        this.paginaAtual = page;
        this.getBanners();
    }
}
