import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaisLidosComponent } from './mais-lidos.component';
import { HttpHandlerService } from 'src/app/http-handler/http-handler.service';
import { MaisLidosService } from './mais-lidos.service';
import { MaisLidosRoutingModule } from './mais-lidos-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    declarations: [
        MaisLidosComponent
    ],
    imports: [
        CommonModule,
        MaisLidosRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxPaginationModule
    ],
    providers: [
        MaisLidosService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpHandlerService,
            multi: true,
        }
    ]
})
export class MaisLidosModule { }
