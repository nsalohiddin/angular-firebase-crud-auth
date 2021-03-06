import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerForm: FormGroup;
  errorMessage: string='';
  successMessage: string='';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { this.createForm();}
  
  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/user']);
    }, err => console.log(err))
  }

  tryRegister(value){
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
       this.errorMessage='';
       this.successMessage='Your Account has been created!';
     }, err => {
       console.log(err);
       this.errorMessage=err.messsage;
       this.successMessage='';
     })
  }

  navigateLoginPage(){
    this.router.navigate(['/login']);
  }

}
