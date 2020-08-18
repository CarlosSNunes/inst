import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusNetworkComponent } from './plus-network.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [PlusNetworkComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [PlusNetworkComponent]
})
export class PlusNetworkModule { }
