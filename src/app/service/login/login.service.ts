import { Injectable } from '@angular/core';
import {HttpService} from '../common/http-service';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(
    private httpService:HttpService
  ) { }

  login(username:string,password:string,imageCode:string){
    return this.httpService.HttpPost('login',{
      username:username,
      password:password,
      imageCode:imageCode
    }, new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}));
  }

  logout(){
    return this.httpService.HttpGet('logout');
  }
}

