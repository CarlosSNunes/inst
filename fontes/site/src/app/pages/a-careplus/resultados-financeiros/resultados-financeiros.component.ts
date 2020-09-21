import { Component, OnInit } from '@angular/core';
import { BreadcrumbModel, TableModel, DropDownItem, SimpleBannerModel } from 'src/app/models';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { FormControlError } from 'src/utils/form-control-error';
import Documents from './data/documents';
import TableItems from './data/table-mock';
import Cards from './data/cards';

@Component({
    selector: 'app-resultados-financeiros',
    templateUrl: './resultados-financeiros.component.html',
    styleUrls: ['./resultados-financeiros.component.scss']
})
export class ResultadosFinanceirosComponent implements OnInit {
    simpleBannerModel: SimpleBannerModel = {
        title: 'Transparência e responsabilidade na prestação de contas',
        description: 'Nesta área, você encontra os últimos relatórios de resultados financeiros da Care Plus.',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/home'
            }),
            new BreadcrumbModel({
                name: 'A CarePlus',
                link: '/a-careplus'
            }),
            new BreadcrumbModel({
                name: 'Resultados Financeiros',
                link: '/a-careplus/resultados-financeiros',
                active: true
            })
        ],
        hasAnchor: false,
        hasFilters: true,
        image: 'assets/img/banner-relatorios-financeiros.jpg'
    };
    filterForm: FormGroup;
    dropDownOptions: DropDownItem[] = [
        {
            key: 'Todos',
            value: 'all'
        },
        {
            key: 'Resultados financeiros de 2019',
            value: '2019'
        },
        {
            key: 'Resultados financeiros de 2018',
            value: '2018'
        },
    ];
    menuStyle: string = 'grid';
    documentsMock = Documents;
    documentsFiltered = this.documentsMock;
    tableItemsMock = TableItems;
    tableItemsMockFiltered = this.tableItemsMock;
    table: TableModel = new TableModel({
        headItems: [
            {
                key: 'title',
                text: 'Título'
            },
            {
                key: 'button',
                text: 'Download'
            }
        ],
        bodyItems: this.tableItemsMockFiltered,
    });
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

    setSEOInfos() {
        this.title.setTitle('Resultados Financeiros | A Care Plus | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus tem o compromisso de manter transparência e responsabilidade na prestação de contas.'
        });
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

}
