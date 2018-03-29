import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../core/auth.service";
import * as _ from 'lodash';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return true;
    // this.auth.user
    //   .take(1)
    //   .map(user => _.has(_.get(user, 'roles'), 'admin'))
    //   .do(authorized => {
    //     if (!authorized) {
    //       console.log('route prevented!')
    //       //  this.router.navigate(['/']);
    //     }
    //   })
  }
}
