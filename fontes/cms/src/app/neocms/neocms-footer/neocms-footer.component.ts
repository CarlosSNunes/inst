import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-neocms-footer',
  templateUrl: './neocms-footer.component.html',
  styleUrls: ['./neocms-footer.component.scss']
})
export class NeocmsFooterComponent implements OnInit {
  today: number = Date.now();
  constructor() { }

  ngOnInit() {
  }

}
