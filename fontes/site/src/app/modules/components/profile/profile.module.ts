import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ShowActiveProfilePipe } from './pipes/show-active-profile.pipe';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProfileComponent, ShowActiveProfilePipe],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
      ProfileComponent
  ]
})
export class ProfileModule { }
