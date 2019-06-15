
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations/index';
import {AuthService} from '../../../../guards/auth.service';
import {Router} from '@angular/router';

@Component({
  selector   : 'login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.scss'],
  animations : fuseAnimations
})
export class LoginComponent implements OnInit
{
  loginForm: FormGroup;


  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    public  _authService: AuthService,
    private router: Router
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
    this.loginForm = this._formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  tryLogin(value){
    this._authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/clients']);
      }, err => {
        console.log(err);
        // this.errorMessage = err.message;
      });
  }

  tryGoogleLogin(){
    this._authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['/clients']);
      });
  }
}
