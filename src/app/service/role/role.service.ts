import {Injectable} from '@angular/core';
import {HttpService} from '../common/http-service';

@Injectable()
export class RoleService {

  constructor(
    private httpService : HttpService
  ) { }

  select(id:number){
    return this.httpService.HttpGet("role/"+id);
  }
  selectAllRole(){
    return this.httpService.HttpGet("role");
  }

  selectAllResourceByRole(id:number){
    return this.httpService.HttpGet("role/"+id+"/resource");
  }

  assignResources(id:number,resourceIds:string){
    return this.httpService.HttpPost("role/"+id+"/resource",{
      resourceIds:resourceIds
    },this.httpService.formHeader);
  }

  insert(role:Role){
    return this.httpService.HttpPost("role",role);
  }

  update(role:Role){
    return this.httpService.HttpPut("role",role);
  }

  delete(id:number){
    return this.httpService.HttpDelete("role/"+id);
  }

}


export class Role{
  public id:number;
  public name:string;
  public description:string;
  public parentId:number;
}
