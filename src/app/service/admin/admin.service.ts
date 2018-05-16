import { Injectable } from '@angular/core';
import {HttpService} from '../common/http-service';

@Injectable()
export class AdminService {

  constructor(
    private httpService : HttpService
  ) { }

  delete(id:number){
    return this.httpService.HttpDelete("admin/"+id);
  }

  select(id:number){
    return this.httpService.HttpGet("admin/"+id);
  }

  insert(admin:Admin){
    return this.httpService.HttpPost("admin",admin);
  }

  update(admin:Admin){
    return this.httpService.HttpPut("admin",admin);
  }

  modifyPwd(adminPwd:AdminPwd,id:number){
    return this.httpService.HttpPut("admin/"+id,adminPwd,this.httpService.formHeader);
  }

}

export class Admin{
  public id:number;
  public username:String;
  public password:String;
  public phone:String;
  public email:String;
  public roleIdList :any;
  public resourceIdList:Array<number>;
  public status = true;
}

export class AdminPwd{
  public oldpassword:String;
  public password:String;
  public pconfirm:String;

}
