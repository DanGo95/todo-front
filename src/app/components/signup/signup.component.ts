import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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

  registro() {
    /* si el formulario es inválido se marcan todos los controles para error */
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

    /* inicia el registro, si sale bien se loguea */
    this.auth.signup(user).subscribe({
      next: (resp: any) => {
        Swal.close();
        this.auth.login(user).subscribe( (response: any) => {
          this.auth.setSession(response.token);
          this.router.navigateByUrl('/home');
        })
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear cuenta',
          text: err.error.errors[0].msg
        })
      }
    })

  }

}
