import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareplusMaisComponent } from './careplus-mais.component';
import { CarePlusMaisRoutingModule } from './careplus-mais-routing.module';
import { BannerModule } from 'src/app/modules/components/banner/banner.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HighlightPostComponent } from './components/highlight-post/highlight-post.component';
import { LastPostsComponent } from './components/last-posts/last-posts.component';
import { MostReadModule } from 'src/app/modules/components/most-read/most-read.module';
import { NewsletterModule } from 'src/app/modules/components/newsletter/newsletter.module';
import { CardModule } from 'src/app/modules/components/card/card.module';
import { CrossContentSectionModule } from 'src/app/modules/components/cross-content-section/cross-content-section.module';
import { SocialPostsModule } from 'src/app/modules/components/social-posts/social-posts.module';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { DetalheDoPostComponent } from './detalhe-do-post/detalhe-do-post.component';
import { BreadcrumbModule } from 'src/app/modules/components/breadcrumb/breadcrumb.module';
import { IconCardsSectionModule } from 'src/app/modules/components/icon-cards-section/icon-cards-section.module';
import { BuscaComponent } from './busca/busca.component';



@NgModule({
    declarations: [CareplusMaisComponent, HighlightPostComponent, LastPostsComponent, AllPostsComponent, DetalheDoPostComponent, BuscaComponent],
    imports: [
        CommonModule,
        CarePlusMaisRoutingModule,
        BannerModule,
        SharedModule,
        MostReadModule,
        NewsletterModule,
        CardModule,
        CrossContentSectionModule,
        SocialPostsModule,
        BreadcrumbModule,
        IconCardsSectionModule
    ]
})
export class CareplusMaisModule { }
