import { Component, OnInit } from '@angular/core';
import {CommonUtil} from '../../utils/commonUtil';
import {LoginService} from '../../service/login/login.service';
import {CommonConfig} from '../../config/commonConfig';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[
    LoginService
  ]
})
export class NavbarComponent implements OnInit {

  adminInfo = this.commonUtil.getAdminInfo();
  constructor(
    private commonUtil:CommonUtil,
    private loginService :LoginService,
    private commonConfig:CommonConfig,
    private router: Router,
  ) { }

  ngOnInit() {
    if(this.commonUtil.isNull(this.adminInfo)){
      this.router.navigate(['login']);
    }
  }

  logout(){
    this.loginService.logout()
      .then(res=>{
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          window.localStorage.removeItem("admin");
          this.router.navigate(['login']);
        }
      });
  }

}
