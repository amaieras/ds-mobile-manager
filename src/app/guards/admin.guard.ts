import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from "../core/auth.service";
import {UserService} from "./user.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private userService: UserService) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
        .then(user => {
          this.router.navigate(['/clients']);
          return resolve(false);
        }, err => {
          return resolve(true);
        })
    })
  }
}
