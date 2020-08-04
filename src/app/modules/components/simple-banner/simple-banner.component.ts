import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SimpleBannerModel } from 'src/app/models';

@Component({
    selector: 'app-simple-banner',
    templateUrl: './simple-banner.component.html',
    styleUrls: ['./simple-banner.component.scss']
})
export class SimpleBannerComponent implements OnInit {
    @Input() simpleBannerModel: SimpleBannerModel = new SimpleBannerModel();
    @Output() goToNextSection: EventEmitter<void> = new EventEmitter<void>();
    
    constructor() { }

    ngOnInit() {
    }

}
