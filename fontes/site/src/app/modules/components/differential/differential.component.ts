import { Component, OnInit, Inject, PLATFORM_ID, Input, ChangeDetectorRef } from '@angular/core';
import DifferentialsArray from './data/differentials';
import { Subscription, interval } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-differential',
    templateUrl: './differential.component.html',
    styleUrls: ['./differential.component.scss']
})
export class DifferentialComponent implements OnInit {
    differentials = DifferentialsArray;
    differentialSubscription: Subscription;
    isBrowser: boolean = false;
    currentDifferential = 0
    @Input() backgroundColorClass: string = 'white-background-color';
    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private cdr: ChangeDetectorRef
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
        if (this.isBrowser) {
            this.currentDifferential = 0;
            this.startDifferentialSubscription(this.differentials[0].time)
        }
    }


    startDifferentialSubscription(time: number) {
        this.differentialSubscription = interval(time).subscribe(() => {
            this.nextDifferential()
        })
    }

    nextDifferential() {
        if (this.currentDifferential < this.differentials.length - 1) {
            this.activate(this.currentDifferential + 1)
        } else {
            this.activate(0)
        }
        this.cdr.detectChanges();
    }


    stopSubscription() {
        this.differentialSubscription.unsubscribe();
    }

    activate(index: number) {
        this.stopSubscription()
        this.differentials = this.differentials.map((diff, i) => {
            if (i == index) {
                diff.active = !diff.active;
                if (diff.active) {
                    this.startDifferentialSubscription(diff.time)
                }
            } else {
                diff.active = false;
            }

            return diff
        })
        this.currentDifferential = index;
    }

    ngOnDestroy() {
        if (this.isBrowser) {
            this.stopSubscription()
        }
    }

}
