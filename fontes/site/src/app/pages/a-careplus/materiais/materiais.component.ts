import { Component, OnInit } from '@angular/core';
import { BreadcrumbModel, SimpleBannerModel } from 'src/app/models';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import Materias from './data/materials';
import { Meta, Title } from '@angular/platform-browser';
import { remove } from 'remove-accents';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-documentos',
    templateUrl: './materiais.component.html',
    styleUrls: ['./materiais.component.scss']
})
export class MateriaisComponent implements OnInit {
    simpleBannerModel: SimpleBannerModel = {
        title: 'Biblioteca de documentos: encontre todos os nossos arquivos disponíveis',
        description: 'Todos os Materiais de Saúde divulgados pela Care Plus estão aqui, reunidos em um só lugar',
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
                name: 'Materiais de Saúde',
                link: '/a-careplus/materiais-de-saude',
                active: true
            })
        ],
        hasAnchor: false,
        hasFilters: true,
        image: 'assets/img/banner-documentos.jpg'
    };
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
                if ((this.filterForm.value.search != '' && remove(doc.title).match(new RegExp(remove(this.filterForm.value.search), 'gi'))) && doc.category === this.filterForm.value.document) {
                    return true
                } else if (this.filterForm.value.search != '' && this.filterForm.value.document === 'all') {
                    if (remove(doc.title).match(new RegExp(remove(this.filterForm.value.search), 'gi'))) {
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
        this.title.setTitle('Materiais de Saúde | ANS, Comunicados e Materiais de Apoio | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Disponibilizamos uma biblioteca de documentos onde você encontra todos os materiais de saúde e da ANS oferecidos pela Care Plus para os seus parceiros.'
        });

         /* 
            Open graph meta tags
        */
            this.meta.updateTag({
                name: "og:title",
                content:
                    'Materiais de Saúde | ANS, Comunicados e Materiais de Apoio | Care Plus',
            });
    
            this.meta.updateTag({
                name: "og:type",
                content:
                    "website",
            });

    
            this.meta.updateTag({
                name: "og:description",
                content: 'Disponibilizamos uma biblioteca de documentos onde você encontra todos os materiais de saúde e da ANS oferecidos pela Care Plus para os seus parceiros.'
            });
    
            this.meta.updateTag({
                name: "og:url",
                content: `${environment.SELF_URL}/a-careplus/materiais-de-saude`,
            });
           
    
            /* 
                Twitter meta tags
            */
    
            this.meta.updateTag({
                name: "twitter:title",
                content:
                    'Materiais de Saúde | ANS, Comunicados e Materiais de Apoio | Care Plus',
            });
    
            this.meta.updateTag({
                name: "twitter:card",
                content:
                    "summary_large_image",
            });
    
            this.meta.updateTag({
                name: "twitter:description",
                content: 'Disponibilizamos uma biblioteca de documentos onde você encontra todos os materiais de saúde e da ANS oferecidos pela Care Plus para os seus parceiros.'
            });
    
            this.meta.updateTag({
                name: "twitter:url",
                content: `${environment.SELF_URL}/a-careplus/materiais-de-saude`,
            });
    }

}
