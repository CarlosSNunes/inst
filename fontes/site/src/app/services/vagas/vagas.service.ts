import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VacancyModel } from 'src/app/models';

@Injectable({
    providedIn: 'root'
})
export class VagasService {

    constructor(
        private httpClient: HttpClient
    ) { }

    async getVacancyById(id: string): Promise<VacancyModel> {
        return this.getVacancyPromisifiedMock();
    }

    getVacancyPromisifiedMock(): Promise<VacancyModel> {
        return new Promise((resolve) => {
            setTimeout(() =>
                resolve(new VacancyModel({
                    name: 'Gerente de Vendas - Área Comercial',
                    descriptions: [
                        'Gerenciar e coordenar o trabalho dos vendedores, gerenciando equipes, delegando atribuições, cobrando resultados e avaliando desempenho.'
                    ],
                    subDescriptions: [
                        'Formular plano de incentivos dos vendedores. Detectar necessidades de treinamento e capacitação profissional da equipe de vendas.',
                        'O processo de vendas é a forma como a equipe vende. O vendedor não tem controle se o cliente vai dizer sim ou não. No entanto, o vendedor tem total controle sobre como agirá para aumentar as chances de chegar a um “sim” no final do processo.'
                    ],
                    preRequisites: [
                        '• amet habitant pulvinar semper risus. Ultricies amet, quisque arcu',
                        '• ullamcorper egestas. Adipiscing purus amet dui ac varius massa scelerisque morbi',
                        '• hendrerit ac pulvinar at maecenas ultrices at nisi',
                        '• posuere tortor volutpat adipiscing nec dictum leo ac amet, purus',
                        '• risus dictumst aliquet id euismod mauris.',
                        '• mauris amet, at porttitor turpis hendrerit lectus',
                        '• sed consectetur facilisis faucibus ut egestas.'
                    ],
                    extraDescriptions: [
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui arcu viverra dignissim tristique blandit ut scelerisque. Aliquet et velit tincidunt feugiat tincidunt tellus. Quis id nisi vel sed volutpat. Neque dolor amet arcu consectetur aenean. Amet habitant pulvinar semper risus. Ultricies amet, quisque arcu, ullamcorper egestas. Adipiscing purus amet dui ac varius massa scelerisque morbi.'
                    ]
                })), 300)
        })
    }
}
