import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AppService } from 'src/app/services';
import { RouteModel } from 'src/app/models';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quem-somos',
  templateUrl: './quem-somos.component.html',
  styleUrls: ['./quem-somos.component.scss']
})
export class QuemSomosComponent implements OnInit, OnDestroy {
  faCheck = faCheck;
  constructor(
    private appService: AppService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    const rotas = [
      new RouteModel(
        {
          description: 'Quem somos',
          route: ''
        }
      )
    ];
    this.changeRota(rotas);
  }

  ngOnDestroy() {
    this.changeRota([]);
  }

  changeRota(rotas: RouteModel[]) {
    this.appService.state = rotas;
    if (rotas.length > 0) {
      this.cdRef.detectChanges();
    }
  }
}
