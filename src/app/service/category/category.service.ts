import {Injectable} from '@angular/core';
import {HttpService} from '../common/http-service';

@Injectable()
export class CategoryService {

  constructor(
    private httpService : HttpService
  ) { }

  insert(category:Category){
    return this.httpService.HttpPost("manage/category",category);
  }

  update(category:Category){
    return this.httpService.HttpPut("manage/category",category);
  }

  delete(id:number){
    return this.httpService.HttpDelete("manage/category/"+id);
  }

  select(id:number){
    return this.httpService.HttpGet("manage/category/"+id);
  }

  selectAll(){
    return this.httpService.HttpGet("manage/category");
  }

}

export class Category{
  public id:number;
  public parentId:number;
  public name:string;
  public status = true;
  public sortOrder:number;
}
