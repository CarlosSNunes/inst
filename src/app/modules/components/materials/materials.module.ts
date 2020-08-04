import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsComponent } from './materials.component';
import { RouterModule } from '@angular/router';
import { CardModule } from '../card/card.module';



@NgModule({
    declarations: [MaterialsComponent],
    imports: [
        CommonModule,
        RouterModule,
        CardModule
    ],
    exports: [MaterialsComponent]
})
export class MaterialsModule { }
