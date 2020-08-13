import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import items from './data/table-items';
import paragraphs from './data/paragraphs';
import { WindowRef } from 'src/utils/window-ref';
import { ModalModel, TableModalModel, FeedbackModalModel, ErrorModalModel, ContentModalModel } from 'src/app/models/modal.model';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    @Output() closeModal: EventEmitter<{ scrollPosition: number }> = new EventEmitter<{ scrollPosition: number }>();
    scrollPosition: number = 0;
    @Input() modalModel: any;

    constructor(
        private windowRef: WindowRef,
        @Inject(DOCUMENT) private document: Document
    ) { }

    ngOnInit() {
        const top = (this.windowRef.nativeWindow.pageYOffset || this.document.documentElement.scrollTop) - (this.document.documentElement.clientTop || 0);
        this.scrollPosition = top;
        this.document.body.classList.add('no-scroll');
        this.document.body.scrollTop = this.scrollPosition;
    }

    close() {
        this.closeModal.emit({
            scrollPosition: this.scrollPosition
        })
    }

    ngOnDestroy() {
        this.document.body.classList.remove('no-scroll');
        this.windowRef.nativeWindow.scrollTo(0, this.scrollPosition)
    }

}
