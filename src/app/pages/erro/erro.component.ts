import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.scss']
})
export class ErroComponent implements OnInit {
  faHome = faHome;

  constructor() { }

  ngOnInit() {
  }

}
