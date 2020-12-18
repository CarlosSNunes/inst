import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,

    ) { }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        let token = localStorage.getItem('user_token')
        if (token) {
            return true;
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
            return false;
        }
    }
}
