import { Component, OnInit, ElementRef, ViewChild, Input, Inject, PLATFORM_ID } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SliderModel, SliderImage } from 'src/app/models';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { VideoModalModel } from 'src/app/models/modal.model';

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
            const imgDivs = this.elementRef.nativeElement.querySelectorAll('.img-div');
            imgDivs[0].classList.add('active')

            this.sliderModel.images.forEach((image, i) => {
                if ((image as SliderImage).modal) {
                    imgDivs[i].classList.add('modal');
                }
            })
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
        this.slider.onResize = function (event) { }
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
        if ((this.sliderModel.images[index] as SliderImage<VideoModalModel>).modal) {
            this.modalService.openModal((this.sliderModel.images[index] as SliderImage<VideoModalModel>).modal)
        }
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