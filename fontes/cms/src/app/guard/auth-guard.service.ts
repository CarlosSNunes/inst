import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,

  ) { }
  private isAuthenticated: boolean = false;

  canActivate() {
    let token = localStorage.getItem('user_token')
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }
  }
}
