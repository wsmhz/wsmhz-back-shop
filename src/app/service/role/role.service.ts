import { Injectable } from '@angular/core';
import {HttpService} from '../common/http-service';

@Injectable()
export class RoleService {

  constructor(
    private httpService : HttpService
  ) { }


  selectAllRole(){
    return this.httpService.HttpGet("role");
  }

  selectAllResourceByRole(id:number){
    return this.httpService.HttpGet("role/"+id+"/resource");
  }

}
