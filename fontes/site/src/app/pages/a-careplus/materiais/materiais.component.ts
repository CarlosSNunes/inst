import { Component, OnInit } from '@angular/core';
import { BreadcrumbModel, SimpleBannerModel } from 'src/app/models';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import Materias from './data/materials';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-documentos',
    templateUrl: './materiais.component.html',
    styleUrls: ['./materiais.component.scss']
})
export class MateriaisComponent implements OnInit {
    simpleBannerModel: SimpleBannerModel = {
        title: 'Biblioteca de documentos: encontre todos os nossos arquivos disponíveis',
        description: 'Todos os materiais divulgados pela Care Plus estão aqui, reunidos em um só lugar.',
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
                name: 'Materiais',
                link: '/a-careplus/materiais',
                active: true
            })
        ],
        hasAnchor: false,
        hasFilters: true,
        image: 'assets/img/a-careplus-documents-banner.jpg'
    };
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            name: 'Home',
            link: '/home'
        }),
        new BreadcrumbModel({
            name: 'A CarePlus',
            link: '/a-careplus'
        }),
        new BreadcrumbModel({
            name: 'Materiais',
            link: '/a-careplus/materiais',
            active: true
        })
    ];
    filterForm: FormGroup;
    documents = Materias;
    documentsFiltered = this.documents;

    constructor(
        private fb: FormBuilder,
        private meta: Meta,
        private title: Title
    ) {
        this.filterForm = this.fb.group({
            document: ['all',],
            search: ['',]
        });
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    filter() {
        this.documentsFiltered = this.documents;
        if (this.filterForm.value.document != 'all' || this.filterForm.value.search != '') {
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
    }

    getErrors(control: AbstractControl) {
        return FormControlError.GetErrors(control);
    }

    get form() {
        return this.filterForm.controls;
    }

    setSEOInfos() {
        this.title.setTitle('Materiais - A Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Todos os materiais divulgados pela Care Plus estão aqui, reunidos em um só lugar.'
        });
    }

}
