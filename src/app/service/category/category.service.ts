import {Injectable} from '@angular/core';
import {HttpService} from '../common/http-service';

@Injectable()
export class CategoryService {

  servicePrefix = "product-service";

  constructor(
    private httpService : HttpService
  ) { }

  insert(category:Category){
    return this.httpService.HttpPost("manage/category",category, null, this.servicePrefix);
  }

  update(category:Category){
    return this.httpService.HttpPut("manage/category",category, null, this.servicePrefix);
  }

  delete(id:number){
    return this.httpService.HttpDelete("manage/category/"+id, this.servicePrefix);
  }

  select(id:number){
    return this.httpService.HttpGet("manage/category/"+id, this.servicePrefix);
  }

  selectAll(){
    return this.httpService.HttpGet("manage/category", this.servicePrefix);
  }

}

export class Category{
  public id:number;
  public parentId:Number = 0;
  public name:string;
  public status = true;
  public sortOrder:number;
}
