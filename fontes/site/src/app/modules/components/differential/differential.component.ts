import { Component, OnInit, Inject, PLATFORM_ID, Input, ChangeDetectorRef, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { DifferentialModel } from 'src/app/models';
import { Subscription, interval } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-differential',
    templateUrl: './differential.component.html',
    styleUrls: ['./differential.component.scss']
})
export class DifferentialComponent implements OnInit, AfterViewInit {
    @Input() differentials: DifferentialModel[] = [];
    @Input() htag: string = 'h5';
    differentialSubscription: Subscription;
    isBrowser: boolean = false;
    currentDifferential = 0;
    diferentialsElements: NodeListOf<HTMLElement>;
    percentage: number = 0;
    percentageStoped: number = 0;
    public getScreenWidth: any;

    @Input() backgroundColorClass: string = 'white-background-color';
    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private cdr: ChangeDetectorRef,
        private elementRef: ElementRef<HTMLElement>
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
        this.differentials = this.differentials.map(differential => {
            differential.active = false;
            return differential
        });
        this.differentials[0].active = true;
        this.onWindowResize();
    }

    @HostListener('window:resize')
    onWindowResize() {
        this.getScreenWidth = window.innerWidth;
    }

    ngAfterViewInit() {
        if (this.isBrowser) {
            this.currentDifferential = 0;
            this.diferentialsElements = this.elementRef.nativeElement.querySelectorAll<HTMLElement>('.accordion-wrapper .accordion-item .height-percentage');
            this.startDifferentialSubscription(this.differentials[0].time / 100, this.differentials[0].time)
        }
    }

    startDifferentialSubscription(time: number, totalTime: number) {
        this.differentialSubscription = interval(time).subscribe(() => {
            this.percentageStoped += 1
            this.percentage = ((time * this.percentageStoped) / totalTime) * 100
            this.setBorderImage(this.percentage)
            if (time * this.percentageStoped >= totalTime) {
                this.nextDifferential()
            }
        })
    }

    nextDifferential() {
        this.percentageStoped = 0
        this.percentage = 0
        this.setBorderImage(0)
        if (this.currentDifferential < this.differentials.length - 1) {
            this.activate(this.currentDifferential + 1)
        } else {
            this.activate(0)
        }
        this.cdr.detectChanges();
    }


    stopSubscription() {
        this.differentialSubscription.unsubscribe();
        this.differentialSubscription.remove(this.differentialSubscription);
    }

    activate(index: number) {
        if (index != this.currentDifferential) {
            this.percentageStoped = 0;
            this.percentage = 0;
        }
        if (index == this.currentDifferential) {
            return;
        }
        this.stopSubscription()
        this.differentials = this.differentials.map((diff, i) => {
            if (i == index) {
                diff.active = !diff.active;
                if (diff.active) {
                    this.startDifferentialSubscription(diff.time / 100, diff.time)
                }
            } else {
                this.diferentialsElements[i].style.height = '0';
                diff.active = false;
            }

            return diff
        })
        this.currentDifferential = index;
    }

    setBorderImage(percentage) {
        this.diferentialsElements[this.currentDifferential].style.height = `${percentage}%`
    }

    ngOnDestroy() {
        if (this.isBrowser) {
            this.stopSubscription()
        }
    }

}
