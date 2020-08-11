import { Component, OnInit, Input, ElementRef, Inject, PLATFORM_ID, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SatDatepickerInputEvent } from 'saturn-datepicker';
import { Moment } from 'moment';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import Units from './data/units';
import { Unity } from 'src/app/models';
import { NotificationService } from 'src/app/services';
import { UnidadesService } from 'src/app/services/unidades/unidades.service';

@Component({
    selector: 'app-see-dates',
    templateUrl: './see-dates.component.html',
    styleUrls: ['./see-dates.component.scss']
})
export class SeeDatesComponent implements OnInit, AfterViewInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    minDate: Date = new Date();
    loading: boolean = false;
    isBrowser: boolean = false;
    units: Unity[] = Units;

    constructor(
        private elementRef: ElementRef<any>,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private cdr: ChangeDetectorRef,
        private notificationService: NotificationService,
        private unidadesSerice: UnidadesService
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
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
        let accTitle = this.elementRef.nativeElement.getElementsByClassName("acc-heading");
        let accContent = this.elementRef.nativeElement.getElementsByClassName("acc-content");
        const headings = this.elementRef.nativeElement.querySelectorAll('.heading-buttons')

        for (let j = 0; j < accContent.length; j++) {
            if (accTitle[j].classList.contains('active')) {
                accTitle[j].classList.remove("active");
                accContent[j].style.height = '0px';
            }

            if (headings[j].classList.contains('full')) {
                headings[j].classList.remove('full')
            }

            let realHeight = accContent[j].scrollHeight;
            accContent[j].setAttribute("data-height", realHeight + "px");
        }
    }

    initAccordion() {
        let accTitle = this.elementRef.nativeElement.getElementsByClassName("acc-heading");
        let accContent = this.elementRef.nativeElement.getElementsByClassName("acc-content");

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
                    that.elementRef.nativeElement.querySelector(`${openedAcc}`).style.height = '0';
                    that.elementRef.nativeElement.querySelector(`${openedAcc}`).style.opacity = '0';
                    evt.target.parentElement.classList.remove('full');
                    return false;
                }

                if (singleMode) {
                    for (let k = 0; k < accTitle.length; k++) {
                        accTitle[k].classList.remove("active");
                    }


                    const headings = that.elementRef.nativeElement.querySelectorAll('.heading-buttons');

                    for (let j = 0; j < accContent.length; j++) {
                        accContent[j].style.height = 0;
                        accContent[j].style.opacity = 0;
                        if (headings[j].classList.contains('full')) {
                            headings[j].classList.remove('full')
                        }
                    }
                }

                evt.target.classList.add("active");

                that.elementRef.nativeElement.querySelector(`${openedAcc}`).style.height = accContent[i].getAttribute("data-height");

                that.elementRef.nativeElement.querySelector(`${openedAcc}`).style.opacity = '1';

                evt.target.parentElement.classList.add('full');

                return false;
            }
        }
    }

    /**
     * note: If range mode is on the type of event is 
     * {SatDatepickerInputEvent<SatDatepickerRangeValue<Moment>>}
     * 
     * @param {SatDatepickerInputEvent<Moment>} event
     * @type {SatDatepickerInputEvent<Moment>}
     */
    onDate(event: SatDatepickerInputEvent<Moment>): void {
        const date = (event.value as Moment).toDate();
        console.log(date)
        this.simulateApiCall();
    }

    async getUnitiesByDay(date: Date) {
        try {
            const formatedDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
            const unities = await this.unidadesSerice.getUnitsByDay(formatedDate);
        } catch (error) {
            this.notificationService.addNotification('error', error.message);
        }
    }

    async simulateApiCall() {
        this.loading = true;

        const promise = () => new Promise((resolve) => {
            setTimeout(() => {
                this.loading = false;
                resolve()
            }, 1000)
        });

        try {
            await promise();
            this.cdr.detectChanges();
            this.initAccordion();
        } catch (error) {
            console.log(error)
        }
    }

}
