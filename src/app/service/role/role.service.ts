import {Injectable} from '@angular/core';
import {HttpService} from '../common/http-service';

@Injectable()
export class RoleService {

  servicePrefix = "oauth-service";

  constructor(
    private httpService : HttpService
  ) { }

  select(id:number){
    return this.httpService.HttpGet("manage/role/"+id, this.servicePrefix);
  }
  selectAllRole(){
    return this.httpService.HttpGet("manage/role", this.servicePrefix);
  }

  selectAllResourceByRole(id:number){
    return this.httpService.HttpGet("manage/role/"+id+"/resource", this.servicePrefix);
  }

  assignResources(id:number,resourceIds:string){
    return this.httpService.HttpPost("manage/role/"+id+"/resource",{
      resourceIds:resourceIds
    },this.httpService.formHeader, this.servicePrefix);
  }

  insert(role:Role){
    return this.httpService.HttpPost("manage/role",role,null, this.servicePrefix);
  }

  update(role:Role){
    return this.httpService.HttpPut("manage/role",role, null, this.servicePrefix);
  }

  delete(id:number){
    return this.httpService.HttpDelete("manage/role/"+id, this.servicePrefix);
  }

}


export class Role{
  public id:number;
  public name:string;
  public description:string;
  public parentId:number;
}
