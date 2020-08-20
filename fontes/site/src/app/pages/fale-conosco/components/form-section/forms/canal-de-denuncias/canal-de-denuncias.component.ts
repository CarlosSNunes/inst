import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { ValidateBrService } from 'angular-validate-br'
import { FileHelper } from 'src/utils/file-helper';
import { NotificationService } from 'src/app/services';

@Component({
    selector: 'app-canal-de-denuncias',
    templateUrl: './canal-de-denuncias.component.html',
    styleUrls: ['./canal-de-denuncias.component.scss']
})
export class CanalDeDenunciasComponent implements OnInit {
    canalDeDenunciasForm: FormGroup;
    files: File[] = [];
    filesNumber: number = 0;
    filerHelper = FileHelper;

    constructor(
        private fb: FormBuilder,
        private validateBrService: ValidateBrService,
        private notificationService: NotificationService
    ) {
        this.mountForm();
    }

    ngOnInit() {
    }

    private mountForm() {
        this.canalDeDenunciasForm = this.fb.group({
            Origem: ['Partner', Validators.compose([Validators.required])],
            // Token será preenchido pelo backend.
            CPFCNPJ: [, Validators.compose([this.validateBrService.cpf])],
            // Certificado: [,], // Verificar a utilização disto pois no site oficial não tem.
            Mensagem: [, Validators.compose([Validators.required, Validators.maxLength(4000)])],
            DDDTelefone: [, Validators.compose([Validators.minLength(1)])],
            Telefone: [, Validators.compose([Validators.minLength(8)])],
            // DDDTelefoneCel: [,], // Verificar a utilização disto pois no site oficial não tem.
            // TelefoneCel: [,], // Verificar a utilização disto pois no site oficial não tem.
            Email: [, Validators.compose([Validators.email])],
            NomeContato: [,],
            CaptchaCode: [, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])],
            Authorization: [false, Validators.compose([Validators.requiredTrue])]
        })
    }

    get form() {
        return this.canalDeDenunciasForm.controls;
    }

    getErrors(control: AbstractControl, fieldName?: string) {
        return FormControlError.GetErrors(control, fieldName);
    }

    fileChangeEvent(fileInput: any) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            for (const file of fileInput.target.files) {
                const filesize = (((file as File).size / 1024) / 1024);
                if (filesize > 2) {
                    this.files = [];
                    this.notificationService.addNotification('error', `O arquivo ${file.name} não pode ter mais de 2MB`, 'bottom')
                    break;
                } else {
                    this.files.push(file)
                }
            };
            this.filesNumber = this.files.length;
        }
    }

    deleteFile(index: number) {
        this.files.splice(index, 1);
        this.filesNumber = this.files.length;
    }

    sendForm() {
        if (this.canalDeDenunciasForm.valid) {
            console.log('valid', this.canalDeDenunciasForm.value)

            const formValue = { ...this.canalDeDenunciasForm.value };

            delete formValue.Authorization;


        } else {
            Object.keys(this.canalDeDenunciasForm.controls).map(control => {
                this.canalDeDenunciasForm.controls[control].markAsTouched();
            });
        }
    }

}
