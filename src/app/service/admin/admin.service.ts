import { Injectable } from '@angular/core';
import {HttpService} from '../common/http-service';

@Injectable()
export class AdminService {

  constructor(
    private httpService : HttpService
  ) { }

  delete(id:number){
    return this.httpService.HttpDelete("manage/admin/"+id);
  }

  select(id:number){
    return this.httpService.HttpGet("manage/admin/"+id);
  }

  insert(admin:Admin){
    return this.httpService.HttpPost("manage/admin",admin);
  }

  update(admin:Admin){
    return this.httpService.HttpPut("manage/admin",admin);
  }

  modifyPwd(adminPwd:AdminPwd,id:number){
    return this.httpService.HttpPut("manage/admin/"+id,adminPwd,this.httpService.formHeader);
  }

  assignRoles(id:number,roleIds:string){
    return this.httpService.HttpPost("manage/admin/"+id+"/role",{
      roleIds:roleIds
    },this.httpService.formHeader);
  }

  loadMenuTree(id:number){
    return this.httpService.HttpGet("manage/admin/"+id+"/resource");
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
