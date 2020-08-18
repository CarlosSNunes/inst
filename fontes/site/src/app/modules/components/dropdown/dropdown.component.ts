import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DropDownItem } from 'src/app/models';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, OnChanges {
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
            this.selectedOption = new DropDownItem({ key: 'Selecione...', value: '' })
            this.setFilter.next(new DropDownItem({ key: '', value: '' }));
        } else {
            this.selectedOption = opt
            this.setFilter.next(opt);
        }
        this.hidden = !this.hidden
    }

    ngOnChanges(changes: SimpleChanges) {
    
        if (changes.default) {
            this.default = changes.default.currentValue;
            this.selectedOption = this.default;
        }

        if (changes.options) {
            this.options = changes.options.currentValue;
        }
    }
}
