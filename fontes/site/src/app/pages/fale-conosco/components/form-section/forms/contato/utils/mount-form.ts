import { Validators } from '@angular/forms';
import { ValidateBrService } from 'angular-validate-br'

export function filterFormFields(subject: number) {
    const formFields = {
        Assunto: {
            label: 'Assunto',
            canShow: true,
            required: true,
            validators: Validators.compose([Validators.required])
        },
        CPFCNPJ: {
            label: 'CPF',
            canShow: true,
            required: false,
            mask: '000.000.000-00',
            validators: Validators.compose([])
        },
        Certificado: {
            label: 'Certificado',
            canShow: true,
            required: false,
            validators: Validators.compose([])
        },
        CodigoCarePlus: {
            label: 'Código Care Plus',
            canShow: true,
            required: false,
            validators: Validators.compose([])
        },
        Comentario: {
            label: 'Comentário',
            canShow: true,
            required: true,
            validators: Validators.compose([Validators.required])
        },
        DDDTelefone1: {
            label: 'DDD 1',
            canShow: true,
            required: true,
            validators: Validators.compose([Validators.required])
        },
        Telefone1: {
            label: 'Telefone 1',
            canShow: true,
            required: true,
            validators: Validators.compose([Validators.required, Validators.minLength(8)])
        },
        DDDTelefone2: {
            label: 'DDD 2',
            canShow: true,
            required: false,
            validators: Validators.compose([])
        },
        Telefone2: {
            label: 'Telefone 2',
            canShow: true,
            required: false,
            validators: Validators.compose([Validators.minLength(8)])
        },
        Email: {
            label: 'E-mail',
            canShow: true,
            required: true,
            validators: Validators.compose([Validators.email, Validators.required])
        },
        IdTipo: {
            label: 'Identifique-se',
            canShow: true,
            required: true,
            validators: Validators.compose([Validators.required])
        },
        NomeContato: {
            label: 'Nome',
            canShow: true,
            required: false,
            validators: Validators.compose([])
        },
        NomeEntidade: {
            label: 'Empresa',
            canShow: true,
            required: false,
            validators: Validators.compose([])
        },
        CaptchaCode: {
            label: 'Código de verificação',
            canShow: true,
            required: true,
            validators: Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])
        },
        lstAnexo: {
            label: 'Anexos',
            canShow: true,
            required: false,
            validators: Validators.compose([])
        }
    }

    const validateBrService = new ValidateBrService();

    switch (subject) {
        case 1:
            formFields.NomeEntidade.canShow = false;
            formFields.CodigoCarePlus.canShow = false;
            formFields.Certificado.validators = Validators.compose([Validators.required]);
            formFields.Certificado.required = true;
            formFields.NomeContato.validators = Validators.compose([Validators.required]);
            formFields.NomeContato.required = true
            formFields.CPFCNPJ.validators = Validators.compose([Validators.required, validateBrService.cpf]);
            formFields.CPFCNPJ.required = true;
            formFields.Email.validators = Validators.compose([Validators.required, Validators.email]);
            break;
        case 2:
            formFields.CPFCNPJ.label = 'CNPJ';
            formFields.CPFCNPJ.mask = '00.000.000/0000-00';
            formFields.CPFCNPJ.validators = Validators.compose([Validators.required, validateBrService.cnpj]);
            formFields.CPFCNPJ.required = true;
            formFields.NomeEntidade.canShow = true;
            formFields.NomeEntidade.validators = Validators.compose([Validators.required]);
            formFields.NomeEntidade.required = true;
            formFields.CodigoCarePlus.canShow = true;
            formFields.CodigoCarePlus.validators = Validators.compose([Validators.required]);
            formFields.CodigoCarePlus.required = true;
            formFields.Certificado.canShow = false;
            formFields.Certificado.required = false;
            formFields.NomeContato.validators = Validators.compose([Validators.required]);
            formFields.NomeContato.required = true;
            formFields.Email.validators = Validators.compose([Validators.required, Validators.email])
            break;

        case 3:
            formFields.CPFCNPJ.label = 'CNPJ';
            formFields.CPFCNPJ.mask = '00.000.000/0000-00';
            formFields.CPFCNPJ.validators = Validators.compose([Validators.required, validateBrService.cnpj]);
            formFields.CPFCNPJ.required = true;
            formFields.NomeEntidade.label = 'Nome Do Credenciado';
            formFields.NomeEntidade.canShow = true;
            formFields.NomeEntidade.validators = Validators.compose([Validators.required]);
            formFields.CodigoCarePlus.canShow = true;
            formFields.CodigoCarePlus.validators = Validators.compose([Validators.required]);
            formFields.CodigoCarePlus.required = true;
            formFields.Certificado.canShow = false;
            formFields.Certificado.required = false;
            formFields.NomeContato.label = 'Nome Do Manifestante';
            formFields.NomeContato.validators = Validators.compose([Validators.required]);

            formFields.Email.validators = Validators.compose([Validators.required, Validators.email])
            break;

        case 4:
            formFields.CPFCNPJ.label = 'CNPJ';
            formFields.CPFCNPJ.mask = '00.000.000/0000-00';
            formFields.CPFCNPJ.validators = Validators.compose([Validators.required, validateBrService.cnpj]);
            formFields.CPFCNPJ.required = true;
            formFields.NomeEntidade.label = 'Nome Do Credenciado';
            formFields.NomeEntidade.canShow = true;
            formFields.NomeEntidade.validators = Validators.compose([Validators.required]);
            formFields.CodigoCarePlus.canShow = true;
            formFields.CodigoCarePlus.validators = Validators.compose([Validators.required]);
            formFields.CodigoCarePlus.required = true;
            formFields.Certificado.canShow = false;
            formFields.Certificado.required = false;
            formFields.NomeContato.label = 'Nome Do Manifestante';
            formFields.NomeContato.validators = Validators.compose([Validators.required]);
            formFields.Email.validators = Validators.compose([Validators.required, Validators.email])
            break;

        case 5:
            formFields.NomeEntidade.canShow = true;
            formFields.NomeEntidade.label = 'Corretora';
            formFields.NomeEntidade.validators = Validators.compose([Validators.required]);
            formFields.NomeContato.label = 'Nome Do Manifestante';
            formFields.NomeContato.validators = Validators.compose([Validators.required]);

            formFields.CodigoCarePlus.canShow = false;
            formFields.Certificado.canShow = false;
            formFields.CPFCNPJ.canShow = false;
            formFields.Email.validators = Validators.compose([Validators.required, Validators.email])
            break;
        case 6:
            formFields.NomeEntidade.canShow = true;
            formFields.NomeEntidade.label = 'Corretora';
            formFields.NomeEntidade.validators = Validators.compose([Validators.required]);
            formFields.NomeContato.label = 'Nome Do Manifestante';
            formFields.NomeContato.validators = Validators.compose([Validators.required]);

            formFields.CodigoCarePlus.canShow = false;
            formFields.Certificado.canShow = false;
            formFields.CPFCNPJ.canShow = false;
            formFields.Email.validators = Validators.compose([Validators.required, Validators.email])
            break;
        case 7:
            formFields.NomeEntidade.canShow = true;
            formFields.NomeEntidade.label = 'Corretora';
            formFields.NomeEntidade.validators = Validators.compose([Validators.required]);
            formFields.NomeContato.label = 'Nome Do Manifestante';
            formFields.NomeContato.validators = Validators.compose([Validators.required]);

            formFields.CodigoCarePlus.canShow = false;
            formFields.Certificado.canShow = false;
            formFields.CPFCNPJ.canShow = false;
            formFields.Email.validators = Validators.compose([Validators.required, Validators.email])
            break;
    }

    return formFields
}