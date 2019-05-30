import {Injectable} from '@angular/core';
import {HttpService} from '../common/http-service';

@Injectable()
export class ResourceService {

  servicePrefix = "oauth-service";

  constructor(
    private httpService : HttpService
  ) { }

  selectAllResource(){
    return this.httpService.HttpGet("manage/resource", this.servicePrefix);
  }

  insert(resource:Resource){
    return this.httpService.HttpPost("manage/resource",resource, null, this.servicePrefix);
  }

  update(resource:Resource){
    return this.httpService.HttpPut("manage/resource",resource, null, this.servicePrefix);
  }

  delete(id:number){
    return this.httpService.HttpDelete("manage/resource/"+id, this.servicePrefix);
  }

  select(id:number){
    return this.httpService.HttpGet("manage/resource/"+id, this.servicePrefix);
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
