import { PromoCardModel } from 'src/app/models';

export const congeladosDaSoniaCard = new PromoCardModel({
    promoImage: 'assets/img/first-card-image.png',
    mainTitles: [
        {
            bigTitle: '10% de desconto',
            smallTitle: 'nas compras',
        }
    ],
    desciptions: [
        'As compras podem ser feitas pelo site ou por telefone. Código de desconto para compras efetuadas através do site: 917. Para compras por telefone, basta informar o número do certificado Care Plus;'
    ]
});

export const promolightCard = new PromoCardModel({
    promoImage: 'assets/img/card-promolight-image.png',
    mainTitles: [
        {
            bigTitle: '15% de desconto',
            smallTitle: 'nas compras',
        }
    ],
    desciptions: [
        'As compras podem ser feitas pelo site, telefone ou aplicativo. Código de desconto para compras efetuadas através do site ou aplicativo CAREPLUS. Para compras por telefone, basta informar o nº do certificado Care Plus.'
    ]
});

export const personalCookCard = new PromoCardModel({
    promoImage: 'assets/img/card-personal-cook.png',
    desciptions: [
        'Neste serviço, os chefs de cozinha profissionais ministram aulas de culinária para você em sua própria casa.',
        'O curso é dividido em módulos e os beneficiários contam com apostila teórica + serviço de compras dos ingredientes.'
    ]
});

export const personalChefsCard = new PromoCardModel({
    promoImage: 'assets/img/personal-chefs-card.jpg',
    logo: 'assets/img/personal-chef-logo.png',
    desciptions: [
        'Neste serviço, os chefs de cozinha profissionais vão até a sua casa e preparam refeições para congelar com base em suas necessidades e preferências.',
        'Os pratos podem ser divididos em porções para quatro ou 16 pessoas.'
    ]
});


export const fourAnyOneCard = new PromoCardModel({
    promoImage: 'assets/img/four-any-one-card.png',
    mainTitles: [
        {
            bigTitle: '30% de desconto',
            smallTitle: 'na mensalidade',
        }
    ],
});
