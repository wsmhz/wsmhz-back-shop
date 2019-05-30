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
  codeImgSrc = "oauth-service/system/code/image?deviceId=wsmhz";
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
      this.codeImgSrc = "oauth-service/system/code/image?deviceId=wsmhz";
    },1);
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.imageCode)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            if (typeof localStorage === 'object') {
              try {
                let curTime = new Date().getTime();
                localStorage.setItem("authorization",JSON.stringify({
                  access_token:res.data.access_token,
                  token_type: res.data.token_type,
                  refresh_token: res.data.refresh_token,
                  scope: res.data.refresh_token,
                  time:curTime
                }));
                this.loginService.getAdminInfo()
                  .then(response => {
                    if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
                      localStorage.setItem("admin",JSON.stringify({admin:response.data,time:curTime}));
                      this.router.navigate(['/home'],{queryParams:{loginFlag:true}});
                    }
                  }).catch(error=>{
                  console.log(error, "获取用户信息失败");
                });
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

