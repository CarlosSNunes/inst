import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { FormControlError } from 'src/utils/form-control-error';
import { simpleBannerModel, materiais } from './data/mock';
import { remove } from 'remove-accents';

@Component({
  selector: 'app-pesquisa-satisfacao',
  templateUrl: './pesquisa-satisfacao.component.html',
  styleUrls: ['./pesquisa-satisfacao.component.scss']
})
export class PesquisaSatisfacaoComponent implements OnInit {
    simpleBannerModel = simpleBannerModel;
    filterForm: FormGroup;
    documents = materiais;
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

    private setSEOInfos() {
        this.title.setTitle('Pesquisa de Satisfação | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Encontre aqui os resultados da nossa Pesquisa de Satisfação com nossos Beneficiários.'
        });
    }

}
