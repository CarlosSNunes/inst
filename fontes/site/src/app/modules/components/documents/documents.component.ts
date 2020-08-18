import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import Documents from './data/documents';
import { CardModel } from 'src/app/models';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
    @Input() backgoundColorClass: string = 'white-background-color';
    @Input() documents: CardModel[] = Documents;
    constructor() { }

    ngOnInit() {
        this.documents = this.documents.map(document => {
            document.backgroundColorClass = this.backgoundColorClass;
            return document
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        this.documents = changes.documents.currentValue;
    }

}
