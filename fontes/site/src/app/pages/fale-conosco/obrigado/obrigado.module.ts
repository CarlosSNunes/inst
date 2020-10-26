import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObrigadoComponent } from './obrigado.component';
import { ObrigadoRoutingModule } from './obrigado-routing.module';
import { BreadcrumbModule } from 'src/app/modules';


@NgModule({
  declarations: [ObrigadoComponent],
  imports: [
    CommonModule,
    ObrigadoRoutingModule,
    BreadcrumbModule
  ]
})
export class ObrigadoModule { }
