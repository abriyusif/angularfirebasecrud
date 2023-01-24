import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  //login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      //success here
      localStorage.setItem('token', 'true');
      this.router.navigate(['/dashboard']);

      if (res.user?.emailVerified == true) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/varify-email']);
      }

    }, error => {
      //print the error here
      alert(error.message);
      this.router.navigate(['/login']);
    })
  }

  //Register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      alert('Registration Successful');
      this.router.navigate(['/login']);
      this.sendEmailForVarification(res.user);
    }, error => {
      alert(error.message);
      this.router.navigate(['/register']);
    })
  }

  //sign out method
  signout() {
    this.fireauth.signOut().then(() => {
      //success
      localStorage.removeItem('token');
      this.router.navigate(['/login']);

    }, error => {
      alert(error.message);
    })
  }
//method for forgot password
  forgotpassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/varify-email']);
    }, error =>{
      alert('Something went wrong ')
    })
  }

  //Email Verification method
  sendEmailForVarification(user: any) {
    user.sendEmailVarification().then((res:any) => {
      this.router.navigate(['/varify-email']);
    }, (error:any) => {
      alert(' Something went wrong. Not able to send mail to your email ');
    })
  }
  //google sign in method
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      //methods
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));

    }, error => {
      alert(error.message);
    })
  }
}
