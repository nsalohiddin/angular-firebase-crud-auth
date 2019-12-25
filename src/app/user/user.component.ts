import { Component, OnInit } from '@angular/core';
import { FirebaseUserModel } from '../core/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 user: FirebaseUserModel= new FirebaseUserModel();
 profileForm: FormGroup;
  constructor(
    public userService: UserService, 
    public authService: AuthService, 
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if(data){
        this.user = data;
        this.createForm(this.user.name)
      }
    })
  }
  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    })
  }

  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
      console.log(res);
    }, err => console.log(err))
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      this.location.back();
    }, err => { 
      console.log('Logout error',err);
    });
  }

}
