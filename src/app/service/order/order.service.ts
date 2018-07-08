import { Injectable } from '@angular/core';
import {HttpService} from '../common/http-service';

@Injectable()
export class OrderService {

  constructor(
    private httpService : HttpService
  ) { }

  delete(id:number){
    return this.httpService.HttpDelete("manage/order/"+id);
  }

  select(id:number){
    return this.httpService.HttpGet("manage/order/"+id);
  }

}

export class OrderVo{
  public id:number;
  public orderNo:number;
  public payment:number;
  public paymentTypeDesc:string;
  public postage:number;
  public statusDesc:string;
  public orderItemList:Array<Object>;
  public shipping:Object;

}
