import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatedPostsComponent } from './related-posts.component';
import { CardModule } from '../card/card.module';



@NgModule({
  declarations: [
    RelatedPostsComponent
  ],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [
    RelatedPostsComponent
  ]
})
export class RelatedPostsModule { }
