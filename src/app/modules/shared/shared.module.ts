import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { SatDatepickerModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, SatNativeDateModule } from 'saturn-datepicker';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter'
import { ReactiveFormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';

export const ISO_FORMAT = {
    parse: {
        dateInput: ['DD/MM/YYYY']
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        MatDatepickerModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
    ],
    exports: [
        FontAwesomeModule,
        RouterModule,
        MatDatepickerModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        NgxMaskModule
    ],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: ISO_FORMAT },
    ]
})

export class SharedModule { }
