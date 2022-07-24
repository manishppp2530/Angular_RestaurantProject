import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from '../Model/usermodel.component';
import { ApiService } from '../shared/api.service';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private _router: Router) { }
  loginModel: UserModel = new UserModel();

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  loginUser() {
    this.loginModel.email = this.formLogin.value.email;
    this.loginModel.password = this.formLogin.value.password;

    this.api.loginUser().subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginModel.email && a.password === this.loginModel.password
      })
      if (user) {
        this._router.navigate(['dashboard'])
      } else {
        alert('Invalid username/password')
      }
    },
      err => {
        alert("Something went wrong")
      })
  }

}
