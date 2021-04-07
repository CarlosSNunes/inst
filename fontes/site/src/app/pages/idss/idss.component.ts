import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { FormControlError } from 'src/utils/form-control-error';
import { simpleBannerModel, materiais, tableMaterials, Table, Cards } from './data/mock';
import { DropDownItem } from 'src/app/models';

@Component({
  selector: 'app-idss',
  templateUrl: './idss.component.html',
  styleUrls: ['./idss.component.scss']
})
export class IdssComponent implements OnInit {
    simpleBannerModel = simpleBannerModel;
    filterForm: FormGroup;
    dropDownOptions: DropDownItem[] = [
        {
            title: 'Todos',
            value: 'all'
        },
        {
            title: 'IDSS 2020',
            value: '2020'
        },
        {
            title: 'IDSS 2019',
            value: '2019'
        },
        {
            title: 'IDSS 2018',
            value: '2018'
        },
    ];
    menuStyle: string = 'grid';
    documentsMock = materiais;
    documentsFiltered = this.documentsMock;
    tableItemsMock = tableMaterials;
    tableItemsMockFiltered = this.tableItemsMock;
    table = Table;
    cards = Cards;

    constructor(
        private fb: FormBuilder,
        private meta: Meta,
        private title: Title
    ) {
        this.setSEOInfos();
        this.filterForm = this.fb.group({
            document: ['all',],
            search: ['',]
        });
    }

    ngOnInit() {
    }

    getErrors(control: AbstractControl) {
        return FormControlError.GetErrors(control);
    }

    get form() {
        return this.filterForm.controls;
    }

    filter() {

        // Documents
        this.documentsFiltered = this.documentsMock;
        if ((this.filterForm.value.document != 'all' && this.filterForm.value.document) || this.filterForm.value.search != '') {
            this.documentsFiltered = this.documentsFiltered.filter(doc => {
                if ((this.filterForm.value.search != '' && doc.title.match(new RegExp(this.filterForm.value.search, 'gi'))) && doc.category === this.filterForm.value.document) {
                    return true
                } else if (this.filterForm.value.search != '' && this.filterForm.value.document === 'all') {
                    if (doc.title.match(new RegExp(this.filterForm.value.search, 'gi'))) {
                        return true
                    }
                    return false
                } else if (this.filterForm.value.search === '' && this.filterForm.value.document != 'all') {
                    if (doc.category === this.filterForm.value.document) {
                        return true
                    }
                    return false
                }
                return false
            })
        }

        // Table
        this.tableItemsMockFiltered = this.tableItemsMock;
        if ((this.filterForm.value.document != 'all' && this.filterForm.value.document) || this.filterForm.value.search != '') {
            this.tableItemsMockFiltered = this.tableItemsMockFiltered.filter(doc => {
                if ((this.filterForm.value.search != '' && doc.title.match(new RegExp(this.filterForm.value.search, 'gi'))) && doc.category === this.filterForm.value.document) {
                    return true
                } else if (this.filterForm.value.search != '' && this.filterForm.value.document === 'all') {
                    if (doc.title.match(new RegExp(this.filterForm.value.search, 'gi'))) {
                        return true
                    }
                    return false
                } else if (this.filterForm.value.search === '' && this.filterForm.value.document != 'all') {
                    if (doc.category === this.filterForm.value.document) {
                        return true
                    }
                    return false
                }
                return false
            })
        }
        this.table.bodyItems = this.tableItemsMockFiltered
    }

    changeMenuStyle(type: string) {
        this.menuStyle = type;
    }

    changeCategory(value: DropDownItem) {
        this.filterForm.controls.document.setValue(value.value)
        this.filter();
    }


    private setSEOInfos() {
        this.title.setTitle('IDSS | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Disponibilizamos todos os materiais sobre o IDSS oferecidos pela Care Plus para os seus parceiros.'
        });
    }

}
