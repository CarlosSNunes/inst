import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarreirasComponent } from './carreiras.component';
import { BannerModule } from 'src/app/modules/components/banner/banner.module';
import { CarreirasRoutingModule } from './carreiras-routing.module';
import { CareplusPlusModule } from 'src/app/modules/components/careplus-plus/careplus-plus.module';
import { ACareplusVideoModule } from 'src/app/modules/components/a-careplus-video/a-careplus-video.module';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { CardModule } from 'src/app/modules/components/card/card.module';
import { RouterModule } from '@angular/router';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';
import { ConsultaFacilComponent } from './consulta-facil/consulta-facil.component';


@NgModule({
    declarations: [CarreirasComponent, ProfilesComponent, ConsultaFacilComponent],
    imports: [
        CommonModule,
        BannerModule,
        CarreirasRoutingModule,
        CareplusPlusModule,
        ACareplusVideoModule,
        CardModule,
        RouterModule,
        SimpleBannerModule
    ]
})
export class CarreirasModule { }
