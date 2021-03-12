import { Injectable } from '@angular/core';
import { DefaultErrors, FieldErrors } from 'src/app/models';
import { NotificationService } from 'src/app/services';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandler {
    constructor(private notificationService: NotificationService) {

    }

    public ShowError(error): void {
        let message = ''
        if (error instanceof FieldErrors) {
            const keys = Object.keys(error.errors)
            const errorsLength = keys.length;
            const fields = keys.toString();
            if (errorsLength > 1) {
                message = `Os campos ${fields} devem ser preenchidos`;
            } else {
                message = `Os campo ${fields} deve ser preenchido`;
            }
        } else if (error instanceof DefaultErrors) {
            message = error.message;
        } else {
            if (error) {
                message = error.message;
            } else {
                message = 'Erro Interno no servidor'
            }
        }

        this.notificationService.addNotification('error', message);
    }
}