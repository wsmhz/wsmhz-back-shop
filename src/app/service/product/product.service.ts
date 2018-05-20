import {Injectable} from '@angular/core';
import {HttpService} from '../common/http-service';

@Injectable()
export class ProductService {

  constructor(
    private httpService : HttpService
  ) { }

  insert(product:Product){
    return this.httpService.HttpPost("manage/product",product);
  }

  update(product:Product){
    return this.httpService.HttpPut("manage/product",product);
  }

  delete(id:number){
    return this.httpService.HttpDelete("manage/product/"+id);
  }

  select(id:number){
    return this.httpService.HttpGet("manage/product/"+id);
  }

  deleteImg(file:string){
    return this.httpService.HttpPut("manage/product/file",{
      file:file
    },this.httpService.formHeader);
  }

  upload(formData){
    return this.httpService.HttpPostUpload("manage/product/file",formData);
  }


}

export class Product{
  public id:number;
  public categoryId:number;
  public name:string;
  public subtitle:string;
  public mainImage:string;
  public subImages:string;
  public detail:string;
  public price:number;
  public stock:number;
  public status:any;
  public flag:string;
}
