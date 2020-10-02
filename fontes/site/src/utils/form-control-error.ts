import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FormControlError {

    public static GetErrors(control: AbstractControl, fieldName?: string) {
        const errors: string[] = [];

        if (!fieldName) {
            fieldName = this.getControlName(control)
        }

        for (const key in control.errors) {

            let error = 'O campo ';
            if (key === 'required') {
                error += fieldName + ' é requerido!';
                errors.push(error);
            } else if (key === 'maxlength') {
                error += fieldName + ' excedeu ' + this.getMaxLength(control.errors, key) + ' caracteres!';
                errors.push(error);
            } else if (key === 'minlength') {
                error += fieldName + ' deve conter no mínimo ' + this.getMaxLength(control.errors, key) + ' caracteres!';
                errors.push(error);
            } else if (key === 'email') {
                error += fieldName + ' deve conter um E-mail válido.';
                errors.push(error);
            } else if (key === 'cpfvalidator' || key === 'cnpjvalidator') {
                error += fieldName + ' deve ser válido';
                errors.push(error);
            }
        }

        return errors;
    }

    static getControlName(c: AbstractControl): string | null {
        const formGroup = c.parent.controls;
        let name = Object.keys(formGroup).find(value => c === formGroup[value]) || null;
        name = name.split(/(?=[A-Z])/).join(' ');
        name = name[0].toUpperCase() + name.slice(1);
        return name;
    }

    static getMaxLength(c: ValidationErrors, key: string) {
        return c[key].requiredLength;
    }

}


