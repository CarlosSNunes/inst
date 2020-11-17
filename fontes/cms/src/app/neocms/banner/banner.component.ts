import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BannerModel } from './../../../../src/models/banner/banner.model';
import { BannerService } from './banner.service';
import { faPencilAlt, faTrash, faPlus, faArrowsAltV, faEllipsisV, faEye, faClone } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
  constructor(
    private bannerService: BannerService,
    private modalService: BsModalService,
  ) { }
  paginaAtual = 0;
  contador = 5;
  modalRef: BsModalRef;
  ngOnInit() {

    this.getBanners();
    console.log(this.banner.ativo)

  }
  deleteBanner() {
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
        this.result = banners['result'];
      },
        error => {
          this.loaded = true;
        });
  }
}
