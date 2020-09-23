import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { DropDownItem } from 'src/app/models';
import Vacancies from './data/vacancies';

@Component({
    selector: 'app-our-disponible-vacancies',
    templateUrl: './our-disponible-vacancies.component.html',
    styleUrls: ['./our-disponible-vacancies.component.scss']
})
export class OurDisponibleVacanciesComponent implements OnInit {
    filterForm: FormGroup;
    dropDownOptions: DropDownItem[] = [
        {
            title: 'Todas',
            value: 'all'
        },
        {
            title: 'Comercial',
            value: 'comercial'
        },
    ];
    selectedCategory: DropDownItem = new DropDownItem({
        title: 'Todas',
        value: 'all'
    });
    vacancies = Vacancies;
    constructor(
        private fb: FormBuilder
    ) {
        this.filterForm = this.fb.group({
            search: ['',],
            category: ['',]
        })
    }

    ngOnInit() {
    }


    getErrors(control: AbstractControl) {
        return FormControlError.GetErrors(control);
    }

    get form() {
        return this.filterForm.controls;
    }

    changeCategory(event: DropDownItem) {
        this.selectedCategory = event;
    }

    filter() {

    }

}
