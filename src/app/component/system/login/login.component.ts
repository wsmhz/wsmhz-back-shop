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
  codeImgSrc = "system/code/image";
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

  changeCode(){
    this.codeImgSrc = "";
    setTimeout(()=>{
      this.codeImgSrc = "system/code/image";
    },1);
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.imageCode)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            if (typeof localStorage === 'object') {
              try {
                localStorage.setItem("admin",JSON.stringify(res.data));
                this.router.navigate(['/home']);
              } catch (e) {
                alert('您处于无痕浏览，无法为您保存信息，请关闭无痕模式后重新登陆');
              }
            }
          }
        }).catch(error=>{
            this.changeCode();
      });
      }
   }







}

