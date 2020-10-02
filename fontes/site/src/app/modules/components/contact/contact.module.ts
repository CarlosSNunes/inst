import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { CardModule } from '../card/card.module';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [ContactComponent],
    imports: [
        CommonModule,
        CardModule,
        RouterModule
    ],
    exports: [ContactComponent]

})
export class ContactModule { }
