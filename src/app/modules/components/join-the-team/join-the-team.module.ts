import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinTheTeamComponent } from './join-the-team.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [JoinTheTeamComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
      JoinTheTeamComponent
  ]
})
export class JoinTheTeamModule { }
