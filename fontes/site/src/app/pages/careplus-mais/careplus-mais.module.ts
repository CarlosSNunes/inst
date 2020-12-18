import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareplusMaisComponent } from './careplus-mais.component';
import { CarePlusMaisRoutingModule } from './careplus-mais-routing.module';
import { BannerModule, SharedModule, MostReadModule, NewsletterModule, CardModule, CrossContentSectionModule, SocialPostsModule, BreadcrumbModule, IconCardsSectionModule } from 'src/app/modules';
import { HighlightPostComponent } from './components/highlight-post/highlight-post.component';
import { LastPostsComponent } from './components/last-posts/last-posts.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { DetalheDoPostComponent } from './detalhe-do-post/detalhe-do-post.component';
import { BuscaComponent } from './busca/busca.component';
import { BuscaPorCategoriaComponent } from './busca-por-categoria/busca-por-categoria.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
    declarations: [CareplusMaisComponent, HighlightPostComponent, LastPostsComponent, AllPostsComponent, DetalheDoPostComponent, BuscaComponent, BuscaPorCategoriaComponent],
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
        IconCardsSectionModule,
        InfiniteScrollModule
    ]
})
export class CareplusMaisModule { }
