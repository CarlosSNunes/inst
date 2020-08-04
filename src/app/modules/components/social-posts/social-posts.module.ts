import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialPostsComponent } from './social-posts.component';



@NgModule({
  declarations: [SocialPostsComponent],
  imports: [
    CommonModule
  ],
  exports: [
      SocialPostsComponent
  ]
})
export class SocialPostsModule { }
