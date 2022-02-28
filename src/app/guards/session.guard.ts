import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  
  constructor( private auth: AuthService, private router: Router ) {}

  canActivate(): boolean {
    if ( this.auth.isLoggedIn() ) {
      this.router.navigateByUrl('/home');
      return false;
    } else {
      return true;
    }
  }
  
}
