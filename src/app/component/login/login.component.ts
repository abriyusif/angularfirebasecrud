import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
//create login method
  login() {
    if (this.email == '') {
      alert(' Please enter email ');
      return;
    }
    if (this.password == '') {
      alert(' Please enter password ');
      return;
    }
    //call login method from auth if the all details are correct
    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

 //sign in with google method
  signInWithGoogle() {
    this.auth.googleSignIn();
}
}
