import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User | null>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword (email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout() {
    this.firebaseAuth.signOut().then((value: any) => {
      this.router.navigate(['/login']);   
    });
  }
}