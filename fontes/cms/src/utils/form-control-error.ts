import { AbstractControl, ValidationErrors, FormControl } from '@angular/forms';

export class FormControlError {

    public static GetErrors(control: AbstractControl) {
        const errors: string[] = [];

        for (const key in control.errors) {
            let error = 'O campo ';

            if (key === 'required') {
                error += this.getControlName(control) + ' é requerido!';
                errors.push(error);
            } else if (key === 'maxlength') {
                error += this.getControlName(control) + ' excedeu ' + this.getMaxLength(control.errors, key) + ' caracteres!';
                errors.push(error);
            } else if (key === 'whitespace') {
                error += this.getControlName(control) + ' não pode possuir apenas espaço!';
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

    public static noWhitespaceValidator(control: FormControl) {
        if (!control) {
            return null;
        }

        const controlLength = (control.value || '').length;
        const controlTrimLenght = (control.value || '').trim().length;
        const isWhitespace = controlLength > 0 && controlTrimLenght === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    }
}


