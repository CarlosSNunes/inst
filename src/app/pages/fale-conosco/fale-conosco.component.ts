import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-fale-conosco',
    templateUrl: './fale-conosco.component.html',
    styleUrls: ['./fale-conosco.component.scss']
})
export class FaleConoscoComponent implements OnInit {
    ids: [
        'solicite-uma-cotacao',
        'fale-conosco',
        'canal-de-denuncias',
        'ouvidoria'
    ];
    selectedId: string = 'solicite-uma-cotacao';
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.activatedRoute.params.subscribe(params => {
            if (params.id) {
                const id = this.ids.find(id => params.id == id)
                if (!id) {
                    this.router.navigate(['/error']);
                }
                this.selectedId = id;
            }
        });
    }

    ngOnInit() {
    }
}
