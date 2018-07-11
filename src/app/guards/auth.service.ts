import { AngularFireAuth} from "angularfire2/auth";
import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";


@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ){}

  doGoogleLogin(){
    // return new Promise<any>((resolve, reject) => {
    //   let provider = new firebase.auth.GoogleAuthProvider();
    //   // provider.addScope('profile');
    //   // provider.addScope('email');
    //   this.afAuth.auth
    //     .signInWithPopup(provider)
    //     .then(res => {
    //       resolve(res);
    //     }, err => {
    //       reject(err);
    //     })
    // })

    return this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }
  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

  doLogout(){
    return new Promise(() => {
      this.afAuth.auth.signOut()
        .then((res) => this.router.navigate(['/login']));
    });
  }
}
