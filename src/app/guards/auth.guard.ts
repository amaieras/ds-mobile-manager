import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';



@Injectable()
export class AuthGuard {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.authState
      .take(1)
      .map(user => {
        return !!user;
      })
      .do(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      });
  }
}
