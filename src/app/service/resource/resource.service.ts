import { Injectable } from '@angular/core';
import {HttpService} from '../common/http-service';
import {Role} from '../role/role.service';

@Injectable()
export class ResourceService {

  constructor(
    private httpService : HttpService
  ) { }

  selectAllResource(){
    return this.httpService.HttpGet("resource");
  }

  insert(resource:Resource){
    return this.httpService.HttpPost("resource",resource);
  }

  update(resource:Resource){
    return this.httpService.HttpPut("resource",resource);
  }

  delete(id:number){
    return this.httpService.HttpDelete("resource/"+id);
  }

  select(id:number){
    return this.httpService.HttpGet("resource/"+id);
  }
}

export class Resource{
  public id:number;
  public name:string;
  public url:string;
  public parentId:number;
  public icon:string;
  public type:string;
  public sort:number;
}
