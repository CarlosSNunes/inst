import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

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
        private router: Router,
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOInfos();
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

    private setSEOInfos() {
        this.title.setTitle('Fale Conosco | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Entre em contato com a Care Plus pelo formulário ou por um dos nossos canais de atendimento.'
        });
    }
}
