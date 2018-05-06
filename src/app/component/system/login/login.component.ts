import { Component, OnInit } from '@angular/core';
import { LoginService} from '../../../service/login/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonConfig} from '../../../config/commonConfig';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[
    LoginService,
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private commonConfig:CommonConfig,
  ) {
    this.loginForm = new FormBuilder().group({
      username: ['', Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
      imageCode: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.imageCode)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            window.localStorage.setItem("admin",JSON.stringify(res.data));
            this.router.navigate(['/home'],{queryParams:{"login":true}});
          }
        });
      }
   }







}

