import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SatDatepickerModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, SatNativeDateModule } from 'saturn-datepicker';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter'
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AngularValidateBrLibModule } from 'angular-validate-br';

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
        RouterModule,
        MatDatepickerModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        AngularValidateBrLibModule,
    ],
    exports: [
        RouterModule,
        MatDatepickerModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        NgxMaskModule,
        AngularValidateBrLibModule,
    ],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: ISO_FORMAT },
    ]
})

export class SharedModule { }
