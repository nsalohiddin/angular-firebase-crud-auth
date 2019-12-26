import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    public router: Router,
    public fb: FormBuilder
  ) { this.createForm()}
 
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {this.router.navigate(['/user'])
  })
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/user']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

  navigatRegisterPage(){
    this.router.navigate(['/register']);
  }

}
