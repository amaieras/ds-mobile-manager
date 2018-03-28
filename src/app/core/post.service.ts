import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {AuthService} from "./auth.service";
import * as _ from 'lodash'

@Injectable()
export class PostService {
  userRoles: Array<string>; // roles of currently logged in user

  constructor(private auth: AuthService,
              private db: AngularFireDatabase) {

    auth.user.map(user => {
      /// Set an array of user roles, ie ['admin', 'author', ...]
      return this.userRoles = _.keys(_.get(user, 'roles'))
    }).subscribe()
  }

}
