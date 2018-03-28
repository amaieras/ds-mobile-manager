import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {User} from "./user";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase";


@Injectable()
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject(null);
  users: AngularFireList<any> = null;
  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
    this.afAuth.authState
      .switchMap(auth => {
        if (auth) {
          /// signed in
          return this.db.object('users/' + auth.uid)
        } else {
          /// not signed in
          return Observable.of(null)
        }
      })
      .subscribe(user => {
        this.user.next(user)
      })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential =>  {
        this.updateUser(credential.user)
      })
  }

  signOut() {
    this.afAuth.auth.signOut()
  }

  /// updates database with user info after login
  /// only runs if user role is not already defined in database
  private updateUser(authData) {
    const userData = new User(authData)
    const ref = this.db.object('users/' + authData.uid);
    this.getUsers(authData).take(1)
      .subscribe(user => {
        if (!user.role) {
          ref.update(userData)
        }
      })

  }
  public getUsers(authData) {
    this.users = this.db.list('users/' + authData.uid);
    return this.users.snapshotChanges().map(arr => {
      //noinspection TypeScriptUnresolvedVariable
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
}
