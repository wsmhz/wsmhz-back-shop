import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Admin} from '../../../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // admin:Admin
  // loginForm:FormGroup;
  constructor(
  ) { }

  ngOnInit() {
    // this.loginForm = new FormBuilder().group({
    //   username: [this.admin.username, [Validators.required]],
    //   password: [this.admin.password, Validators.required]
    // });
  }

}
