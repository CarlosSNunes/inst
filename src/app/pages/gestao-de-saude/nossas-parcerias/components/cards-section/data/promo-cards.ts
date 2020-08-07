import { PromoCardModel } from 'src/app/models';

export const congeladosDaSoniaCard = new PromoCardModel({
    promoImage: 'assets/img/first-card-image.jpg',
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
    promoImage: 'assets/img/card-promolight-image.jpg',
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

export const emporioDaPapinhaCard = new PromoCardModel({
    promoImage: 'assets/img/card-emporio-da-papinha.jpg',
    mainTitles: [
        {
            bigTitle: '10% de desconto',
            smallTitle: 'em todas as compras',
        }
    ],
    desciptions: [
        'A compra deverá ser realizada nas lojas exclusivas do Empório da Papinha ou pelo telefone da loja mais próxima do cliente (apresentar a carteirinha da Care Plus)'
    ]
});

export const personalCookCard = new PromoCardModel({
    promoImage: 'assets/img/card-personal-cook.jpg',
    mainTitles: [
        {
            bigTitle: 'Desconto',
            smallTitle: 'com chefs de cozinha profissionais',
        }
    ],
    desciptions: [
        'Neste serviço, os chefs de cozinha profissionais ministram aulas de culinária para você em sua própria casa.',
        'O curso é dividido em módulos e os beneficiários contam com apostila teórica + serviço de compras dos ingredientes.'
    ]
});

export const personalChefsCard = new PromoCardModel({
    promoImage: 'assets/img/personal-chefs-card.jpg',
    desciptions: [
        'Neste serviço, os chefs de cozinha profissionais vão até a sua casa e preparam refeições para congelar com base em suas necessidades e preferências.',
        'Os pratos podem ser divididos em porções para quatro ou 16 pessoas.'
    ]
});


export const fourAnyOneCard = new PromoCardModel({
    promoImage: 'assets/img/four-any-one-card.jpg',
    mainTitles: [
        {
            bigTitle: '10% de desconto',
            smallTitle: 'na mensalidade',
        }
    ],
});

export const antiloperacingteamCard = new PromoCardModel({
    promoImage: 'assets/img/card-promolight-image.jpg',
    mainTitles: [
        {
            bigTitle: '15% de desconto',
            smallTitle: 'no plano mensal',
        },
        {
            bigTitle: '30% de desconto',
            smallTitle: 'no plano semestral',
        },
        {
            bigTitle: '35% de desconto',
            smallTitle: 'no plano anual',
        }
    ],
});