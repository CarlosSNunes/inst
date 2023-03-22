import { Component, OnInit } from '@angular/core';
import { BreadcrumbModel, TableModel, DropDownItem, SimpleBannerModel } from 'src/app/models';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { FormControlError } from 'src/utils/form-control-error';
import Documents from './data/documents';
import TableItems from './data/table-mock';
import Cards from './data/cards';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-resultados-financeiros',
    templateUrl: './resultados-financeiros.component.html',
    styleUrls: ['./resultados-financeiros.component.scss']
})
export class ResultadosFinanceirosComponent implements OnInit {
    simpleBannerModel: SimpleBannerModel = {
        title: 'Transparência e responsabilidade na prestação de contas',
        description: 'Nesta área, você encontra os últimos relatórios de resultados financeiros da Care Plus',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/'
            }),
            new BreadcrumbModel({
                name: 'A Care Plus',
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
            title: 'Todos',
            value: 'all'
        },
        {
            title: 'Resultados financeiros de 2022',
            value: '2022'
        },
        {
            title: 'Resultados financeiros de 2021',
            value: '2021'
        },
        {
            title: 'Resultados financeiros de 2020',
            value: '2020'
        },
        {
            title: 'Resultados financeiros de 2019',
            value: '2019'
        },
        {
            title: 'Resultados financeiros de 2018',
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
                title: 'title',
                text: 'Título'
            },
            {
                title: 'button',
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
        this.title.setTitle('Resultados Financeiros | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus preza pela transparência e responsabilidade na prestação de contas. Aqui, você encontra os últimos resultados financeiros da Care Plus.'
        });

         /*
            Open graph meta tags
        */
            this.meta.updateTag({
                name: "og:title",
                content:
                    'Resultados Financeiros | Care Plus',
            });

            this.meta.updateTag({
                name: "og:type",
                content:
                    "website",
            });


            this.meta.updateTag({
                name: "og:description",
                content: 'A Care Plus preza pela transparência e responsabilidade na prestação de contas. Aqui, você encontra os últimos resultados financeiros da Care Plus.'
            });

            this.meta.updateTag({
                name: "og:url",
                content: `${environment.SELF_URL}/a-careplus/resultados-financeiros`,
            });

            this.meta.updateTag({
                name: "og:image",
                content:`${environment.SELF_URL}/assets/img/banner-relatorios-financeiros.jpg`,
            });

            /*
                Twitter meta tags
            */

            this.meta.updateTag({
                name: "twitter:title",
                content:
                    'Resultados Financeiros | Care Plus',
            });

            this.meta.updateTag({
                name: "twitter:card",
                content:
                    "summary_large_image",
            });

            this.meta.updateTag({
                name: "twitter:description",
                content: 'A Care Plus preza pela transparência e responsabilidade na prestação de contas. Aqui, você encontra os últimos resultados financeiros da Care Plus.'
            });

            this.meta.updateTag({
                name: "twitter:url",
                content: `${environment.SELF_URL}/a-careplus/resultados-financeiros`,
            });

            this.meta.updateTag({
                name: "twitter:image",
                content:`${environment.SELF_URL}/assets/img/banner-relatorios-financeiros.jpg`,
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
