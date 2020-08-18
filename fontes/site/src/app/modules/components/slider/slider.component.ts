import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Input, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SliderModel } from 'src/app/models';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { ContentModalModel } from 'src/app/models/modal.model';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
    @ViewChild('nav', { static: false }) slider: NgImageSliderComponent;
    @Input() sliderModel = new SliderModel()
    index: number = 0;
    isBrowser: boolean = false;

    constructor(
        private elementRef: ElementRef<Document>,
        private modalService: ModalService,
        @Inject(PLATFORM_ID) private platformId: Platform
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.isBrowser) {
            const imgDiv = this.elementRef.nativeElement.querySelector('.img-div');
            imgDiv.classList.add('active')
            this.overrideSliderSwipeMethod()
            this.overrideOnResizeMethod()
        }
    }

    overrideSliderSwipeMethod() {
        let that = this
        this.slider.swipe = function (e: TouchEvent, when: string) {
            const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
            const time = new Date().getTime();

            if (when === 'start') {
                this.swipeCoord = coord;
                this.swipeTime = time;
            } else if (when === 'end') {
                const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
                const duration = time - this.swipeTime;
                if (duration < 1000 //
                    && Math.abs(direction[0]) > 30 // Long enough
                    && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
                    const swipe = direction[0] < 0 ? 'next' : 'prev';
                    that.slider.sliderPrevDisable = false;
                    that.slider.sliderNextDisable = false;
                    that.slider[swipe]();
                }
            }
        }
    }

    overrideOnResizeMethod() {
        this.slider.onResize = function (event) {}
    }

    changeSlide(action: string) {
        const imgDivs = this.elementRef.nativeElement.querySelectorAll('.img-div');

        if (action === 'next' && this.index < (this.sliderModel.images.length - 1)) {
            if (this.slider.imageDiv.nativeElement.classList.contains('active')) {
                this.slider.imageDiv.nativeElement.classList.remove('active')
            }
            this.index++
            imgDivs.item(this.index - 1).classList.remove('active')
            imgDivs.item(this.index).classList.add('active')
        } else if (action === 'previous' && this.index > 0) {
            if (this.slider.imageDiv.nativeElement.classList.contains('active')) {
                this.slider.imageDiv.nativeElement.classList.remove('active')
            }
            this.index--
            imgDivs.item(this.index + 1).classList.remove('active')
            imgDivs.item(this.index).classList.add('active')
        }
    }

    onImageClick(index: number) {
        /*
            TODO - falta o conteúdo que deverá ser enviádo para o cliente.

            - Por enquanto as informações estão mocadas.
        */
        const modalContent: ContentModalModel = new ContentModalModel({
            layout: 'content',
            type: 'info',
            title: 'Mitos e verdades sobre a escovação',
            smallTitle: 'SAÚDE BUCAL',
            paragraphs: [
                {
                    "title": "Importância da escovação",
                    "text": "A escovação é extremamente importante, não apenas para ter um sorriso mais bonito, mas, também, para cuidar da saúde bucal, prevenir cáries, mal hálito e doenças como gengivite, periodontite, entre outras. Vamos esclarecer algumas dúvidas mais frequentes sobre a escovação."
                },
                {
                    "title": "Tenho que escovar meus dentes logo depois de terminar uma refeição?",
                    "text": "Mito! Ao fim de uma refeição o correto é aguardar até 30 minutos. Esse tempo é preciso, porque alguns alimentos possuem acidez e podem deixar o esmalte dos dentes sensíveis. Por esse motivo, é importante aguardar o PH da boca se equilibrar."
                }
            ],
            imagePath: 'assets/svg/content-modal-image.svg'
        });
        this.modalService.openModal(modalContent)
    }

    next() {
        this.slider.sliderNextDisable = false;
        this.slider.next();
    }

    prev() {
        this.slider.sliderPrevDisable = false;
        this.slider.prev();
    }

}