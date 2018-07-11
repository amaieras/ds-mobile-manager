
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations/index';
import {AuthService} from "../../../../guards/auth.service";
import {Router} from "@angular/router";

@Component({
  selector   : 'login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.scss'],
  animations : fuseAnimations
})
export class LoginComponent implements OnInit
{
  loginForm: FormGroup;
  errorMessage: string = '';
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    public authService: AuthService,
    private _router: Router
  )
  {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar : {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer : {
          hidden: true
        }
      }
    };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void
  {
    this.createForm();
  }

  createForm() {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
      .then(res => {
        this._router.navigate(['clients']);
      })
  }
  tryLogin(value){
    this.authService.doLogin(value)
      .then(res => {
        this._router.navigate(['clients']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      })
  }
}
