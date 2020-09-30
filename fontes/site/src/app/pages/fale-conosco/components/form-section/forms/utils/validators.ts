import { FormGroup, ValidatorFn } from '@angular/forms';

export function requireAtLeastOne(minRequired = 1): ValidatorFn {
    return function validate(formGroup: FormGroup) {
        let checked = 0;

        Object.keys(formGroup.controls).filter(key => key === 'planoSaude' || key === 'planoOdontologico' || key === 'medicinaOcupacional').forEach(key => {
            const control = formGroup.controls[key];
            if (control.value === 1) {
                checked++;
            }
        });

        if (checked < minRequired) {
            return {
                requireAtLeastOne: true,
            };
        }

        return null;
    };
}