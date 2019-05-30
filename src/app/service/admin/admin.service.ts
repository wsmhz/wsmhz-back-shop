import { Injectable } from '@angular/core';
import {HttpService} from '../common/http-service';

@Injectable()
export class AdminService {

  servicePrefix = "oauth-service";

  constructor(
    private httpService : HttpService
  ) { }

  delete(id:number){
    return this.httpService.HttpDelete("manage/admin/"+id, this.servicePrefix);
  }

  select(id:number){
    return this.httpService.HttpGet("manage/admin/"+id, this.servicePrefix);
  }

  insert(admin:Admin){
    return this.httpService.HttpPost("manage/admin",admin, null, this.servicePrefix);
  }

  update(admin:Admin){
    return this.httpService.HttpPut("manage/admin",admin, null, this.servicePrefix);
  }

  modifyPwd(adminPwd:AdminPwd,id:number){
    return this.httpService.HttpPut("manage/admin/"+id,adminPwd,this.httpService.formHeader, this.servicePrefix);
  }

  assignRoles(id:number,roleIds:string){
    return this.httpService.HttpPost("manage/admin/"+id+"/role",{
      roleIds:roleIds
    },this.httpService.formHeader, this.servicePrefix);
  }

  loadMenuTree(id:number){
    return this.httpService.HttpGet("manage/admin/"+id+"/resource", this.servicePrefix);
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
