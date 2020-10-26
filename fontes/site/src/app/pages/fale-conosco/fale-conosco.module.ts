import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaleConoscoComponent } from './fale-conosco.component';
import { FaleConoscoRoutingModule } from './fale-conosco-routing.module';
import { CommomQuestionsModule, BreadcrumbModule, DropdownModule, SharedModule } from 'src/app/modules';
import { FormSectionComponent } from './components/form-section/form-section.component';
import { OnlyNumbersModule } from 'src/app/directives/only-numbers/only-numbers.module';
import { SoliciteUmaCotacaoComponent } from './components/form-section/forms/solicite-uma-cotacao/solicite-uma-cotacao.component';
import { ContatoComponent } from './components/form-section/forms/contato/contato.component';
import { CanalDeDenunciasComponent } from './components/form-section/forms/canal-de-denuncias/canal-de-denuncias.component';
import { OuvidoriaComponent } from './components/form-section/forms/ouvidoria/ouvidoria.component';

@NgModule({
  declarations: [
    FaleConoscoComponent,
    FormSectionComponent,
    SoliciteUmaCotacaoComponent,
    ContatoComponent,
    CanalDeDenunciasComponent,
    OuvidoriaComponent,
  ],
  imports: [
    CommonModule,
    FaleConoscoRoutingModule,
    CommomQuestionsModule,
    BreadcrumbModule,
    DropdownModule,
    SharedModule,
    OnlyNumbersModule
  ]
})
export class FaleConoscoModule { }
