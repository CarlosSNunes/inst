import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaisComponent } from './materiais.component';
import { MateriaisRoutingModule } from './materiais-routing.module';
import { LearnMoreModule, SharedModule, DocumentsModule, SimpleBannerModule } from 'src/app/modules';



@NgModule({
  declarations: [MateriaisComponent],
  imports: [
    CommonModule,
    MateriaisRoutingModule,
    LearnMoreModule,
    SharedModule,
    DocumentsModule,
    SimpleBannerModule
  ]
})
export class MateriaisModule { }
