import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaleConoscoComponent } from './fale-conosco.component';
import { FaleConoscoRoutingModule } from './fale-conosco-routing.module';
import { CommomQuestionsModule } from 'src/app/modules/components/commom-questions/commom-questions.module';
import { FormSectionComponent } from './components/form-section/form-section.component';
import { BreadcrumbModule } from 'src/app/modules/components/breadcrumb/breadcrumb.module';
import { DropdownModule } from 'src/app/modules/components/dropdown/dropdown.module';

@NgModule({
  declarations: [
    FaleConoscoComponent,
    FormSectionComponent,
  ],
  imports: [
    CommonModule,
    FaleConoscoRoutingModule,
    CommomQuestionsModule,
    BreadcrumbModule,
    DropdownModule
  ]
})
export class FaleConoscoModule { }
