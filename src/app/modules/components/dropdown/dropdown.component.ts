import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DropDownItem } from 'src/app/models';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
    hidden: boolean = true;
    selectedOption: DropDownItem = new DropDownItem({ value: '', key: '' });
    @Input() options: DropDownItem[];
    @Input() default: DropDownItem;
    @Output() setFilter = new EventEmitter<DropDownItem>();
    constructor() { }

    ngOnInit() {
        this.selectedOption = this.default
    }

    showList() {
        this.hidden = !this.hidden;
    }
    hideList() {
        this.hidden = true
    }

    public selectOption(opt: DropDownItem) {
        if (this.selectedOption == opt || this.selectedOption == { key: '', value: '' }) {
            this.selectedOption = this.default
            this.setFilter.next({ key: '', value: '' });

        } else {
            this.selectedOption = opt
            this.setFilter.next(opt);
        }
        this.hidden = !this.hidden
    }
}
