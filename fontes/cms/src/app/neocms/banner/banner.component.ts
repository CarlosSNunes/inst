import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BannerModel } from './../../../../src/models/banner/banner.model';
import { BannerService } from './banner.service';
import { faPencilAlt, faTrash, faPlus, faArrowsAltV, faEllipsisV, faEye, faClone } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BannerCreateModel } from 'src/models/banner/banner-create.model';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
    @Input() bannerAtivo: boolean;

    banners: BannerModel[] = [];

    faPencilAlt = faPencilAlt;
    faTrash = faTrash;
    faPlus = faPlus;
    faArrowsAltV = faArrowsAltV;
    faEllipsisV = faEllipsisV;
    faEye = faEye;
    faClone = faClone;

    loaded: boolean;
    showBannerDelete: boolean;
    banner: BannerModel;
    imagemLargura = 50;
    imagemMargem = 2;
    pathDivision: string = "/";
    nomeImagemDesktop;
    result: any;
    message: string;
    bannerForm: FormGroup;
    paginaAtual = 0;
    contador = 5;
    modalRef: BsModalRef;


    constructor(
        private bannerService: BannerService,
        private modalService: BsModalService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {

        this.getBanners();
        console.log(this.banner.ativo)

    }

    deleteBanner() {
    }

    get f() {
        return this.bannerForm.controls;
    }


    private duplicarBanner(banner: BannerModel) {

        this.bannerForm = this.fb.group({
            nomeImagem: [banner.nomeImagemDesktop],
            nomeImageMobile: [banner.nomeImagemMobile],
            titulo: [banner.titulo],
            subtitulo: [banner.subtitulo],
            area: [banner.area],
            tempoExibicao: [banner.tempoExibicao],
            descricao: [banner.descricao],
            rota: [banner.rota],
            linkExterno: [banner.linkExterno],
            nomeLink: [banner.nomeLink],
            ativo: [banner.ativo],
        });

        console.log(this.bannerForm);
        const newBanner = new BannerCreateModel(this.bannerForm.value);
        this.bannerService.post(newBanner)
            .subscribe(() => {
            })
            .add();
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
            .subscribe(result => {
                this.message = 'Banner:' + id + ' deletada com sucesso!';
                this.modalRef.hide();
            });

    }
    openModalDuplicarBanner(template: TemplateRef<BannerModel>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    }

    confirmDuplicar(banner: BannerModel): void {

        this.duplicarBanner(banner);
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }

    getBanners() {
        this.showBannerDelete = false;
        this.bannerService
            .getAll()
            .subscribe(banners => {
                this.loaded = true;
                this.banners = banners;
            },
                error => {
                    this.loaded = true;
                });
    }
}
