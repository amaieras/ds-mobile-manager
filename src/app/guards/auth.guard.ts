import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";



@Injectable()
export class AuthGuard implements CanActivate{

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._authService.afAuth.authState
      .take(1)
      .map(authState => !! authState)
      .do( authenticated => {
        if (!authenticated) {
          this._router.navigate(["/auth/login"]);
        }
      });
  }
}
