import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalSystemComponent } from './personal-system.component';
import { PersonalSystemRoutingModule } from './personal-system-routing.module';
import { IconCardsSectionModule, InfoSectionModule, SimpleBannerModule } from 'src/app/modules';



@NgModule({
    declarations: [PersonalSystemComponent],
    imports: [
        CommonModule,
        PersonalSystemRoutingModule,
        SimpleBannerModule,
        InfoSectionModule,
        IconCardsSectionModule,
    ]
})
export class PersonalSystemModule { }
