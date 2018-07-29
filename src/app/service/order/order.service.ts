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

  shipment(order:Order){
    return this.httpService.HttpPut("manage/order/",order);
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

export class Order{

  public id:number;
  /**
   * 订单号
   */
  public orderNo:number;
  /**
   * 用户id
   */
  public userId:number;
  /**
   * 收货地址id
   */
  public shippingId:number;
  /**
   * 支付金额
   */
  public payment:number;
  /**
   * 邮费
   */
  public postage:number;
  /**
   * 订单状态
   */
  public status:string;
  /**
   * 支付时间
   */
  public paymentTime:string;
  /**
   * 发货时间
   */
  public sendTime:string;
  /**
   * 交易完成时间
   */
  public endTime:string;
  /**
   * 交易关闭时间
   */
  public closeTime:string;
}
