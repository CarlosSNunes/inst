import { Component, OnInit, Output, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { WindowRef } from 'src/utils/window-ref';
import { DOCUMENT } from '@angular/common';
import { AnimationEvent, trigger, state, style, transition, animate } from '@angular/animations';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-simuladores',
    templateUrl: './simuladores.component.html',
    styleUrls: ['./simuladores.component.scss'],
    animations: [
        trigger('homeLeaveAnimation', [
            // ...
            state('stepper', style({
                transform: 'translateY(-100vh)',
                opacity: 0,
                display: 'none'
            })),
            transition('* => stepper', [
                animate('0.3s')
            ]),
        ]),
        trigger('stepperEnterAnimation', [
            // ...
            state('stepper', style({
                transform: 'translateY(0px)',
                opacity: 1,
                height: 'calc(100vh - 56px)',
                top: '56px',
            })),
            transition('* => stepper', [
                animate('0.3s')
            ]),
        ]),
        trigger('finish', [
            // ...
            state('finished', style({
                transform: 'translateY(-100vh)',
            })),
            transition('* => finished', [
                animate('0.5s ease-in-out')
            ]),
            state('init', style({
                transform: 'translateY(0)',
            })),
            transition('* => init', [
                animate('0.5s ease-in-out')
            ]),
            state('close', style({
                transform: 'translateY(-100vh)',
            })),
            transition('* => close', [
                animate('0.5s ease-in-out')
            ]),
        ]),
    ],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
    }]
})
export class SimuladoresComponent implements OnInit, OnDestroy {
    @Output() close: EventEmitter<{ scrollPosition: number }> = new EventEmitter<{ scrollPosition: number }>();
    scrollPosition: number = 0;
    step: number = 1;
    homeAnimationState: string = 'home';
    finishAnimationState: string = 'init';
    firstStepForm: FormGroup;
    secondStepForm: FormGroup;
    stepClass: string = '';
    currentStep: number = 1;
    formsInfos: object = {};
    stepperPosition: string = 'absolute';

    constructor(
        private windowRef: WindowRef,
        @Inject(DOCUMENT) private document: Document,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.firstStepForm = this.fb.group({
            planType: ['', Validators.compose([Validators.required])]
        });

        this.secondStepForm = this.fb.group({
            plan: ['',]
        });
    }

    ngOnInit() {
        const top = (this.windowRef.nativeWindow.pageYOffset || this.document.documentElement.scrollTop) - (this.document.documentElement.clientTop || 0);
        this.scrollPosition = top;
        this.document.body.classList.add('no-scroll');
        this.document.body.scrollTop = this.scrollPosition;
    }

    closeSimuladores() {
        this.close.emit({
            scrollPosition: this.scrollPosition
        })
    }

    ngOnDestroy() {
        this.document.body.classList.remove('no-scroll');
        this.windowRef.nativeWindow.scrollTo(0, this.scrollPosition)
    }

    onStepChange(event) {
        switch (event.selectedIndex) {
            case 0:
                this.stepClass = 'first';
                this.currentStep = 1;
                break;
            case 1:
                this.stepClass = 'second';
                this.currentStep = 2;
                break;
            case 2:
                this.stepClass = 'third';
                this.currentStep = 3;
                break;
        }

        this.formsInfos = {
            ...this.firstStepForm.value,
            ...this.secondStepForm.value
        };
    }

    scheduleAVisit() {
        this.router.navigate(['/fale-conosco'], {
            queryParams: this.formsInfos
        });
        this.finishAnimationState = 'finished';
    }

    captureDoneEvent(event: AnimationEvent) {
        if (event.toState == 'finished') {
            this.scrollPosition = 0;
            this.closeSimuladores();
        }

        if (event.toState == 'close') {
            this.closeSimuladores();
        }

        if (event.toState == 'stepper') {
            this.stepperPosition = 'unset'
        }
    }

}
