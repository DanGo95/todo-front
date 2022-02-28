import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup

  constructor( private fb: FormBuilder, private auth: AuthService, private router: Router ) { 

    this.createForm();

  }

  ngOnInit(): void {
  }

  invalidInput(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched
  }

  createForm(){

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  login() {

    if ( this.form.invalid ){

      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();
      })
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    })

    Swal.showLoading();

    const user: User = this.form.value;

    this.auth.login(user).subscribe({
      next: (resp: any) => {
        Swal.close();
        this.auth.setSession(resp.token);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: err.error.msg
        })
      }
    })

  }

}
