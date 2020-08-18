import { Component, OnInit, Input } from '@angular/core';
import { CrossContentModel } from 'src/app/models';

@Component({
    selector: 'app-cross-content-section',
    templateUrl: './cross-content-section.component.html',
    styleUrls: ['./cross-content-section.component.scss']
})
export class CrossContentSectionComponent implements OnInit {
    @Input() crossContentModel: CrossContentModel;
    constructor() { }

    ngOnInit() {
    }

}
