import { Component, OnInit, Input } from '@angular/core';
import { IconCardModel } from 'src/app/models';

@Component({
    selector: 'app-learn-more',
    templateUrl: './learn-more.component.html',
    styleUrls: ['./learn-more.component.scss']
})
export class LearnMoreComponent implements OnInit {
    @Input() cards: IconCardModel[] = [
        new IconCardModel({
            type: 'icon',
            title: 'Rede Plus',
            description: 'Descubra a Rede Plus, uma seleção de médicos que possuem diferenciação curricular, estrutura de atendimento e relacionamento único com a Care Plus.',
            imagePath: 'assets/svg/star-hand.svg'
        }),
        new IconCardModel({
            type: 'icon',
            title: 'Resultados Financeiros',
            description: 'Tenha acesso aos nossos registros financeiros dos últimos anos e acompanhe o nosso balanço patrimonial. Mais transparência na prestação de contas.',
            imagePath: 'assets/svg/charts.svg'
        }),
        new IconCardModel({
            type: 'icon',
            title: 'Carreiras',
            description: 'Já imaginou fazer parte de um time que transforma a vida das pessoas todos os dias? Veja a nossa proposta para a sua carreira e integre um time que está cada vez mais transformando vidas e sonhos de pessoas e empresas.',
            imagePath: 'assets/svg/business.svg'
        })
    ];
    constructor() { }

    ngOnInit() {
    }

}
