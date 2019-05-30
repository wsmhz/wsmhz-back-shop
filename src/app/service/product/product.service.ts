import {Injectable} from '@angular/core';
import {HttpService} from '../common/http-service';

@Injectable()
export class ProductService {

  servicePrefix = "product-service";

  constructor(
    private httpService : HttpService
  ) { }

  insert(product:Product){
    return this.httpService.HttpPost("manage/product",product, null, this.servicePrefix);
  }

  update(product:Product){
    return this.httpService.HttpPut("manage/product",product, null, this.servicePrefix);
  }

  delete(id:number){
    return this.httpService.HttpDelete("manage/product/"+id, this.servicePrefix);
  }

  select(id:number){
    return this.httpService.HttpGet("manage/product/"+id, this.servicePrefix);
  }

  deleteImg(file:string){
    return this.httpService.HttpPut("manage/product/file",{
      file:file
    },this.httpService.formHeader, this.servicePrefix);
  }

  upload(formData){
    return this.httpService.HttpPostUpload("manage/product/file",formData, this.servicePrefix);
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
  public status:String = "ON_SALE";
  public flag:String = "NORMAL";
}
