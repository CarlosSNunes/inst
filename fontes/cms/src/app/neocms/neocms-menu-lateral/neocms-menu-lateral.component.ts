import { Component, OnInit } from '@angular/core';
import {
  faHome,
  faTachometerAlt,
  faPencilAlt,
  faDesktop,
  faTable,
  faChartBar,
  faCog,
  faBug,
  faWindowMaximize,
  faLaptop,
  faNewspaper,
  faDiagnoses,
  faTag,
  faEdit,
  faMoneyCheckAlt,
  faImages,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-neocms-menu-lateral',
  templateUrl: './neocms-menu-lateral.component.html',
  styleUrls: ['./neocms-menu-lateral.component.scss']
})
export class NeocmsMenuLateralComponent implements OnInit {
  faHome = faHome;
  faTachometerAlt = faTachometerAlt;
  faPencilAlt = faPencilAlt;
  faDesktop = faDesktop;
  faTable = faTable;
  faChartBar = faChartBar;
  faCog = faCog;
  faBug = faBug;
  faWindowMaximize = faWindowMaximize;
  faLaptop = faLaptop;
  faNewspaper = faNewspaper;
  faDiagnoses = faDiagnoses;
  faTag = faTag;
  faEdit = faEdit;
  faMoneyCheckAlt = faMoneyCheckAlt;
  faImages = faImages;

  constructor(

  ) { }

  ngOnInit() {
  }

}
