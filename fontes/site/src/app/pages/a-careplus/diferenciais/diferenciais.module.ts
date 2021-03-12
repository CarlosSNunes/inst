import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiferenciaisComponent } from './diferenciais.component';
import { BannerModule, ACareplusVideoModule, CardModule, SimpleBannerModule, CareplusPlusModule } from 'src/app/modules';
import { DiferenciaisRoutingModule } from './diferenciais-routing.module';
import { ProfilesComponent } from './components/profiles/profiles.component';

@NgModule({
    declarations: [DiferenciaisComponent, ProfilesComponent],
    imports: [
        CommonModule,
        BannerModule,
        DiferenciaisRoutingModule,
        ACareplusVideoModule,
        CardModule,
        SimpleBannerModule,
        CareplusPlusModule
    ]
})
export class DiferenciaisModule { }
