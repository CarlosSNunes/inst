import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-banner-order',
  templateUrl: './banner-order.component.html',
  styleUrls: ['./banner-order.component.scss']
})
export class BannerOrderComponent implements OnInit {

  banners: any = [];
  loaded: boolean = false
  selectedFilter: string = "Beneficiario";
  constructor() {

  }
  ngOnInit() {
    this.banners = [
      {
        order: 1,
        image: 'Teste',
        title: 'titulo',
        active: '03/12/2020',
        area: 'home'
      },
      {
        order: 2,
        image: 'Teste',
        title: 'titulo',
        active: '03/12/2020',
        area: 'home'
      },
      {
        order: 3,
        image: 'Teste',
        title: 'titulo',
        active: '03/12/2020',
        area: 'home'
      },
      {
        order: 4,
        image: 'Teste',
        title: 'titulo',
        active: '03/12/2020',
        area: 'home'
      }
    ]
    this.loaded = true
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

  }
  saveBanners() {
    this.banners = [];
    this.loaded = false;
    setTimeout(() => {
      this.banners = [
        {
          order: 1,
          image: 'Teste',
          title: 'titulo',
          active: '03/12/2020',
          area: 'home'
        },
        {
          order: 2,
          image: 'Teste',
          title: 'titulo',
          active: '03/12/2020',
          area: 'home'
        },
        {
          order: 3,
          image: 'Teste',
          title: 'titulo',
          active: '03/12/2020',
          area: 'home'
        },
        {
          order: 4,
          image: 'Teste',
          title: 'titulo',
          active: '03/12/2020',
          area: 'home'
        }
      ];
      this.loaded = true;
    }, 5000)
  }
}
