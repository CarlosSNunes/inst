import { Component, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {


    constructor(
    ) {
        setTheme('bs4');
        
    }

    ngOnInit() {
    }

}
