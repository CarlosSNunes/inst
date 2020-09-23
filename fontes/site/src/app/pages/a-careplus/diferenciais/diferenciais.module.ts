import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiferenciaisComponent } from './diferenciais.component';
import { BannerModule } from 'src/app/modules/components/banner/banner.module';
import { DiferenciaisRoutingModule } from './diferenciais-routing.module';
import { ACareplusVideoModule } from 'src/app/modules/components/a-careplus-video/a-careplus-video.module';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { CardModule } from 'src/app/modules/components/card/card.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';
import { ConsultaFacilComponent } from './consulta-facil/consulta-facil.component';
import { SeeDatesComponent } from './consulta-facil/components/see-dates/see-dates.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HowItWorksComponent } from './consulta-facil/components/how-it-works/how-it-works.component';
import { OurDifferentialsComponent } from './consulta-facil/components/our-differentials/our-differentials.component';


@NgModule({
    declarations: [DiferenciaisComponent, ProfilesComponent, ConsultaFacilComponent, SeeDatesComponent, HowItWorksComponent, OurDifferentialsComponent],
    imports: [
        CommonModule,
        BannerModule,
        DiferenciaisRoutingModule,
        ACareplusVideoModule,
        CardModule,
        SimpleBannerModule,
        SharedModule
    ]
})
export class DiferenciaisModule { }
