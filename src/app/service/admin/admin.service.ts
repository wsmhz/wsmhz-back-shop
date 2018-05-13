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
}

export class Admin{
  public username;
  public password;
  public phone;
  public email;
}
