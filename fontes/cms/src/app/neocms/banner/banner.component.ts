/**========================================================================
 **                            BANNER COMPONENT

 //* INFO: Componente de Listagem de Banners
 *========================================================================**/

import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BannerModel } from 'src/models/banner/banner.model';
import { BannerService } from './banner.service';
import { faPencilAlt, faTrash, faPlus, faArrowsAltV, faEllipsisV, faEye, faClone } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    banners: BannerModel[] = [];
    banner: BannerModel;
    bannerForm: FormGroup;
    modalRef: BsModalRef;
    bannerCount: number = 0;
    bannerResult: any;
    contador = 4;
    loaded: boolean;
    message: string;
    paginaAtual = 1;
    showBannerDelete: boolean;
    thumbnail: string;
    selectedFilter: string = "home";
    userPermission: string;

    constructor(
        private bannerService: BannerService,
        private modalService: BsModalService,
        private toastrService: ToastrService,
    ) { }

    ngOnInit() {
        this.userPermission = JSON.parse(localStorage.getItem('user_token')).perfis[0].descricao;

        this.getBanners();
    }

    deleteBanner() {
    }

    get f() {
        return this.bannerForm.controls;
    }

    private duplicarBanner(banner: BannerModel) {
        this.bannerService.duplicate(banner.id)
            .subscribe(() => {
                this.message = 'Banner: ' + banner.id + ' duplicado com sucesso!';
                this.modalRef.hide();
                this.toastrService.success('Banner duplicado com sucesso!');
                this.paginaAtual = 0;
                this.getBanners();
            },
                (error) => {
                    let message = '';
                    if (error.error) {
                        message = error.error.message || 'Erro Interno no servidor';
                    } else {
                        message = error.message || 'Erro Interno';
                    }
                    this.toastrService.error(message);
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
                this.toastrService.success('Banner deletado com sucesso!');
                this.paginaAtual = 0;
                this.getBanners();
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
            .getAll(offset, this.contador, this.selectedFilter)
            .subscribe(banners => {
                this.loaded = false;
                this.bannerResult = banners.result;
                this.bannerCount = banners.count;
                this.loaded = true;

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
    filter(newFilter) {
        this.selectedFilter = newFilter;
        this.getBanners();
    }
}
