import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimuladoresComponent } from './simuladores.component';
import { RouterModule } from '@angular/router';
import { HomeStepComponent } from './components/home-step/home-step.component';
import { MatIconModule, MatButtonModule, MatStepperModule } from '@angular/material';
import { FirstStepComponent } from './components/first-step/first-step.component';
import { SharedModule } from '../../shared/shared.module';
import { SecondStepComponent } from './components/second-step/second-step.component';
import { ThirdStepComponent } from './components/third-step/third-step.component';

@NgModule({
    entryComponents: [SimuladoresComponent],
    declarations: [SimuladoresComponent, HomeStepComponent, FirstStepComponent, SecondStepComponent, ThirdStepComponent],
    imports: [
        CommonModule,
        MatStepperModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        SharedModule
    ],
    exports: [
        SimuladoresComponent,
    ]
})
export class SimuladoresModule { }
