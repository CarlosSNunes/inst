import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [ProductComponent],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        ProductComponent
    ]
})
export class ProductModule { }
