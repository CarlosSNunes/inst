import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BannerService } from '../banner.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-banner-order',
  templateUrl: './banner-order.component.html',
  styleUrls: ['./banner-order.component.scss']
})
export class BannerOrderComponent implements OnInit {

  banners: any = [];
  loaded: boolean = false
  selectedFilter: string = "Beneficiario";
  constructor(private bannerService: BannerService,

    private toastrService: ToastrService,) {

  }
  ngOnInit() {
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
      .getAll(0, 4, this.selectedFilter)
      .subscribe(response => {
        this.loaded = false;
        this.banners = []
        this.banners = response.result;
        this.banners.caminhoCompletoDesktop;
        this.loaded = true;
        console.log(this.banners)

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
    this.getBanners();
    // setTimeout(() => {
    //   this.banners = [
    //     {
    //       order: 1,
    //       image: 'Teste',
    //       title: 'titulo',
    //       active: '03/12/2020',
    //       area: 'home'
    //     },
    //     {
    //       order: 2,
    //       image: 'Teste',
    //       title: 'titulo',
    //       active: '03/12/2020',
    //       area: 'home'
    //     },
    //     {
    //       order: 3,
    //       image: 'Teste',
    //       title: 'titulo',
    //       active: '03/12/2020',
    //       area: 'home'
    //     },
    //     {
    //       order: 4,
    //       image: 'Teste',
    //       title: 'titulo',
    //       active: '03/12/2020',
    //       area: 'home'
    //     }
    //   ];
    //   this.loaded = true;
    // }, 5000)
  }
}
