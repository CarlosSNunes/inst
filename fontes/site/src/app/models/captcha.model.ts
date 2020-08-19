export class CaptchaSaida {
    constructor(init?: Partial<CaptchaSaida>) {
        Object.assign(this, init)
    }

    CodigoMensagem: number;
    Mensagem: string;
    Captcha: number;
    ImgCaptcha: string;
}