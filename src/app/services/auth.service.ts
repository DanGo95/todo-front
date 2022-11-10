import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://todo-dcu6.onrender.com/api/auth';

  user!: string;

  usetToken: string = '';

  constructor( private http: HttpClient, private router: Router ) { }

  login( user: User ) {
    return this.http.post(`${this.url}/login`, user);
  }

  signup( user: User ) {
    return this.http.post(`${this.url}/registro`, user);
  }

  setSession(token: string) {
    localStorage.setItem('id_token', token);
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigateByUrl('/login');
  }

  isLoggedIn() {
    const token = localStorage.getItem('id_token');
    if (!token) {
      return false;
    }
    return true;
  }
}
