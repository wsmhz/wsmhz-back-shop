import {Injectable} from '@angular/core';
import {HttpService} from '../common/http-service';

@Injectable()
export class LoginService {

  servicePrefix = "oauth-service";

  constructor(
    private httpService:HttpService
  ) { }

  login(username:string,password:string,imageCode:string){
    return this.httpService.HttpPost('system/login',{
      username:"admin_" + username,
      password:password,
      imageCode:imageCode,
      deviceId: 'wsmhz'
    },this.httpService.formHeader, this.servicePrefix);
  }

  logout(){
    return this.httpService.HttpGet('/logout', this.servicePrefix);
  }

  getAdminInfo(){
    return this.httpService.HttpGet('/userInfo', this.servicePrefix);
  }
}

