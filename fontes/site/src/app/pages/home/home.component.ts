import {
    Component,
    OnInit,
    ChangeDetectorRef,
    ViewChild,
    HostListener,
    Inject,
    PLATFORM_ID
} from '@angular/core';
import { ProductComponent } from '../../modules/components/product/product.component';
import { bannersMock } from './data/banners'
import { isPlatformBrowser } from '@angular/common';
import { WindowRef } from 'src/utils/window-ref';
import { Title, Meta } from '@angular/platform-browser';
import { ocupationalSection, videoModel, iconCardsSectionModel } from './data/mock';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    banners = bannersMock;
    scrollTop = 0;
    @ViewChild('sectionProduct', { static: false }) sectionProduct: ProductComponent;
    showBtnToTop = false;
    isBrowser: boolean = false;
    ocupationalSection = ocupationalSection;
    videoModel = videoModel;
    iconCardsSectionModel = iconCardsSectionModel;

    constructor(
        private cdRef: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private plataformId,
        private windowRef: WindowRef,
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOInfos();
        this.isBrowser = isPlatformBrowser(this.plataformId);
    }

    ngOnInit() {
        if (this.isBrowser) {
            this.cdRef.detectChanges();
        }
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
        this.scrollTop = event.currentTarget.pageYOffset;
        if (this.scrollTop > this.sectionProduct.offsetTop) {
            this.showBtnToTop = true;
        } else {
            this.showBtnToTop = false;
        }
    }

    slideToSection() {
        const elementOffset = parseInt(localStorage.getItem('elementOffset'));
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: (this.sectionProduct.offsetTop - elementOffset),
            behavior: "smooth"
        })
    }

    goToTop() {
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: 0,
            behavior: "smooth"
        })
    }

    setSEOInfos() {
        this.title.setTitle('Home | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus é uma operadora que disponibiliza soluções de medicina, odontologia, saúde ocupacional e prevenção. Atendemos mais de 100 mil beneficiários.'
        });
    }
}
