import { Component, OnInit, ElementRef, Inject, PLATFORM_ID, Input, HostListener, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AccordionComponent implements OnInit {
    @Input() questions: Array<any> = [];
    isBrowser: boolean = false;
    constructor(
        private element: ElementRef<any>,
        @Inject(PLATFORM_ID) private plataformId
    ) {
        this.isBrowser = isPlatformBrowser(this.plataformId)
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.isBrowser) {
            this.initAccordion();
        }
    }

    @HostListener('window: resize') onResize() {
        this.resetAccordion();
    }

    resetAccordion() {
        let accTitle = this.element.nativeElement.getElementsByClassName("acc-heading");
        let accContent = this.element.nativeElement.getElementsByClassName("acc-content");

        for (let j = 0; j < accContent.length; j++) {
            if (accTitle[j].classList.contains('active')) {
                accTitle[j].classList.remove("active");
                accContent[j].style.height = '0px';
            }
            let realHeight = accContent[j].scrollHeight;
            accContent[j].setAttribute("data-height", realHeight + "px");
        }
    }

    initAccordion() {
        let accTitle = this.element.nativeElement.getElementsByClassName("acc-heading");
        let accContent = this.element.nativeElement.getElementsByClassName("acc-content");

        let singleMode = true;

        for (let j = 0; j < accContent.length; j++) {
            let realHeight = accContent[j].offsetHeight;
            accContent[j].setAttribute("data-height", realHeight + "px");
            accContent[j].style.height = 0;
        }

        for (let i = 0; i < accTitle.length; i++) {
            const that = this
            accTitle[i].onclick = function (evt) {
                let openedAcc = evt.target.getAttribute('href');
                if (evt.target.classList.contains("active")) {
                    evt.target.classList.remove("active");
                    that.element.nativeElement.querySelector(`${openedAcc}`).style.height = '0';
                    return false;
                }

                if (singleMode) {
                    for (let k = 0; k < accTitle.length; k++) {
                        accTitle[k].classList.remove("active");
                    }

                    for (let j = 0; j < accContent.length; j++) {
                        accContent[j].style.height = 0;
                    }
                }

                evt.target.classList.add("active");

                that.element.nativeElement.querySelector(`${openedAcc}`).style.height = accContent[i].getAttribute("data-height");

                return false;
            }
        }
    }

}
