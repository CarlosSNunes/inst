import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services';
import { activeChanel, chanelForms } from './data/mock';

@Component({
    selector: 'app-form-section',
    templateUrl: './form-section.component.html',
    styleUrls: ['./form-section.component.scss']
})
export class FormSectionComponent implements OnInit {
    chanelForms = chanelForms;
    activeChanel = activeChanel;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef,
    ) {
        this.setActiveChanel(0);
        this.activatedRoute.params.subscribe(params => {
            if (params.id) {
                const chanel = this.chanelForms.find(chanel => params.id == chanel.slug)
                if (!chanel) {
                    this.router.navigate(['/error']);
                }
                this.setActiveChanel(chanel.id - 1)
            }
        });

        EventEmitterService.get('fale-conosco-form').subscribe(slug => {
            const chanel = this.chanelForms.find(chanel => slug == chanel.slug)
            if (!chanel) {
                this.router.navigate(['/error']);
            }
            this.setActiveChanel(chanel.id - 1);
            this.cdr.detectChanges();
        });
    }

    ngOnInit() {
    }

    private setActiveChanel(index: number) {
        this.chanelForms = this.chanelForms.map((chanel, i) => {
            if (i === index) {
                chanel.active = true
                this.activeChanel = chanel;
            } else {
                chanel.active = false
            }
            return chanel
        });
    }

}
