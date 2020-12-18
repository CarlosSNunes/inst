import { Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {

    constructor(
        private injector: Injector
    ) { }
    handleError(error: any) {
        if (error instanceof HttpErrorResponse) {
            if (error.error instanceof ErrorEvent) {
                console.error('Error Event');
            } else {
                console.log(`error status : ${error.status} ${error.statusText}`);
                const router = this.injector.get(Router);
                const authenticationService = this.injector.get(AuthenticationService);

                switch (error.status) {
                    case 401:
                        authenticationService.state = null;
                        router.navigate(['/login']);
                        break;
                    case 403:
                        authenticationService.state = null;
                        router.navigate(['/login']);
                        break;
                }
            }
        } else {
            console.log(error)
        }
        return throwError(error);
    }
}
