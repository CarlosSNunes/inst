import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { BannerModel } from 'src/models/banner/banner.model';
import { BannerService } from '../banner.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-banner-delete',
  templateUrl: './banner-delete.component.html',
  styleUrls: ['./banner-delete.component.scss']
})
export class BannerDeleteComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Input()
  banner: BannerModel;

  usuario: UserAuthenticateModel;

  constructor(
    private bannerService: BannerService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deleteBanner() {
    this.bannerService
      .delete(this.banner.id)
      .subscribe(result => this.closeModal());
  }
}
