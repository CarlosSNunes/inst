import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiferenciaisComponent } from './diferenciais.component';
import { BannerModule } from 'src/app/modules/components/banner/banner.module';
import { DiferenciaisRoutingModule } from './diferenciais-routing.module';
import { ACareplusVideoModule } from 'src/app/modules/components/a-careplus-video/a-careplus-video.module';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { CardModule } from 'src/app/modules/components/card/card.module';
import { SimpleBannerModule } from 'src/app/modules/components/simple-banner/simple-banner.module';

@NgModule({
    declarations: [DiferenciaisComponent, ProfilesComponent],
    imports: [
        CommonModule,
        BannerModule,
        DiferenciaisRoutingModule,
        ACareplusVideoModule,
        CardModule,
        SimpleBannerModule
    ]
})
export class DiferenciaisModule { }
