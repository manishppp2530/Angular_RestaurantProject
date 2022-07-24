import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../Model/usermodel.component';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formSignupValue!: FormGroup;
  userModelobj: UserModel = new UserModel();
  constructor(private formBuilder:FormBuilder, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.formSignupValue = this.formBuilder.group({
      name : [''],
      email : [''],
      password : ['']
    })
  }

  signuUp(){
    this.userModelobj.name = this.formSignupValue.value.name;
    this.userModelobj.email = this.formSignupValue.value.email;
    this.userModelobj.password = this.formSignupValue.value.password;
    
    //making API call to register the user
    this.api.signuUpUser(this.userModelobj).subscribe(res => {
      alert("User registred successfully") 
      this.formSignupValue.reset();
      this.router.navigate(['login'])
    })
}
}
