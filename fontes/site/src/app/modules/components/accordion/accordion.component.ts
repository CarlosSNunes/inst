import { Component, OnInit, ElementRef, Inject, PLATFORM_ID, Input, HostListener, ViewEncapsulation, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WindowRef } from 'src/utils/window-ref';
import DefaultContent from './data/default-content';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AccordionComponent implements OnInit, OnChanges {
    @Input() questions: Array<any> = DefaultContent;
    isBrowser: boolean = false;
    width: number = 0;
    constructor(
        private element: ElementRef<any>,
        @Inject(PLATFORM_ID) private plataformId,
        private windowRef: WindowRef,
        private cdr: ChangeDetectorRef
    ) {
        this.isBrowser = isPlatformBrowser(this.plataformId)
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.isBrowser) {
            this.initAccordion();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.questions) {
            this.questions = changes.questions.currentValue;
            this.cdr.detectChanges();
            this.initAccordion();
            this.cdr.detectChanges();
            setTimeout(() => {
                this.cdr.detectChanges();
                this.resetAccordion(), 100
            })
        }
    }

    @HostListener('window: resize', ['$event']) onResize(event) {
        if (event.target.innerWidth != this.width) {
            this.width = event.target.innerWidth;
            this.resetAccordion();
        }
    }

    resetAccordion() {
        let accTitle = this.element.nativeElement.getElementsByClassName("acc-heading");
        let accContent = this.element.nativeElement.getElementsByClassName("acc-content");

        for (let j = 0; j < accContent.length; j++) {
            if (accTitle[j].classList.contains('active')) {
                accTitle[j].classList.remove("active");
                accContent[j].style.height = '0px';
            }
        }
    }

    initAccordion() {
        let accTitle = this.element.nativeElement.getElementsByClassName("acc-heading");
        let accContent = this.element.nativeElement.getElementsByClassName("acc-content");

        let singleMode = true;

        for (let j = 0; j < accContent.length; j++) {
            accContent[j].style.height = 0;
        }

        for (let i = 0; i < accTitle.length; i++) {
            const that = this
            accTitle[i].onclick = function (evt) {
                evt.preventDefault();
                that.cdr.detectChanges();
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

                const element = that.element.nativeElement.querySelector(`${openedAcc}`)
                element.style.height = `${element.scrollHeight + 22}px`;

                return false;
            }
        }
    }

}
