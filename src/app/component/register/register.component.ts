import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  //create login method
  register() {
    if (this.email == '') {
      alert(' Please enter email ');
      return;
    }
    if (this.password == '') {
      alert(' Please enter password ');
      return;
    }
    //call login method from auth if the all details are correct
    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }

}
