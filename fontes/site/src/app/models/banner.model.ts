export class BannerModel {
    public constructor(init?: Partial<BannerModel>) {
        // TODO Isso deverá ser tratado no backend futuramente.
        if (init) {
            Object.keys(init).forEach(title => {
                if (init[title] == null) {
                    delete init[title];
                }

                if (title == 'nomeLink' && !init[title] == null) {
                    init[title] = 'Saiba Mais';
                }
            });
        }

        Object.assign(this, init);
        this.splitAnchor(init);
    }

    id: number;
    tag: string;
    titulo: string;
    subtitulo: string;
    descricao: string;
    dataCadastro: Date;
    usuarioId: number;
    rota: string;
    ancora: string;
    linkExterno: string;
    link: string;
    nomeLink: string = 'Saiba Mais';
    caminhoImagem: string;
    nomeImagem: string;
    caminhoCompletoDesktop: string;
    caminhoDesktop: string;
    nomeImagemDesktop: string;
    caminhoCompletoMobile: string;
    caminhoMobile: string;
    nomeImagemMobile: string;
    tempoExibicao: number;
    slideAtual: boolean = false;
    action: string = '';
    firstInteraction: boolean = false;
    bannerState: string;

    private splitAnchor(init: Partial<BannerModel>) {
        if (init && init.rota && init.rota.indexOf('#') > -1) {
            const index = init.rota.indexOf('#');
            this.ancora = init.rota.substring(index + 1, init.rota.length);
            this.rota = this.rota.replace(init.rota.substring(index, init.rota.length), '');
        }
    }
}
