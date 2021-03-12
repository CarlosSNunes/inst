import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BannerService } from '../banner.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-banner-order',
  templateUrl: './banner-order.component.html',
  styleUrls: ['./banner-order.component.scss']
})
export class BannerOrderComponent implements OnInit {

  banners: any = [];
  loaded: boolean = false
  selectedFilter: string = "home";
  userPermission: string;

  constructor(private bannerService: BannerService,

    private toastrService: ToastrService,
    private router: Router) {

  }
  ngOnInit() {
    this.userPermission = JSON.parse(localStorage.getItem('user_token')).perfis[0].descricao;
    if(this.userPermission == 'Visualizador'){
        this.router.navigate(['dashboard'])
    }
    this.getBanners()

  }
  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.banners, event.previousIndex, event.currentIndex);
    this.saveBanners();

  }
  filter(newFilter) {
    this.selectedFilter = newFilter;
    this.getBanners()
  }
  getBanners() {
    this.bannerService
      .getAll(0, 4, this.selectedFilter, 1)
      .subscribe(response => {
        this.loaded = false;
        this.banners = []
        this.banners = response.result;
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
  saveBanners() {
    let newBannerList = [];

    this.banners.map((banner, index) => {
      newBannerList.push({
        "bannerId": banner.id,
        "ativo": "1",
        "ordem": index
      })
    })

    let newOrder = {
      "area": {
        "areaName": this.selectedFilter,
        "banners": newBannerList
      }
    }

    this.bannerService.changeOrder(newOrder).subscribe(response => {
      this.getBanners();
      this.toastrService.success("Ordem alterada com sucesso!");
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
}
