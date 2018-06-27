import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../guards/auth.service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }


  tryGoogleLogin(){
    this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['/clients']);
      })
  }
  tryLogin(value){
    this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/clients']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      })
  }
}
