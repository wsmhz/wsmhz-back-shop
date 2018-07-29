import { Component, OnInit } from '@angular/core';
import {Order, OrderService, OrderVo} from '../../../service/order/order.service';
import {ActivatedRoute} from '@angular/router';
import {CommonConfig} from '../../../config/commonConfig';
import {CommonUtil} from '../../../utils/commonUtil';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers:[
    OrderService
  ]
})
export class OrderDetailComponent implements OnInit {

  orderVo = new OrderVo();
  orderItemList = [];
  shipping;
  constructor(
    private routerInfo:ActivatedRoute,
    private commonConfig:CommonConfig,
    private commonUtil:CommonUtil,
    private orderService:OrderService
  ) { }

  ngOnInit() {
    let id = this.routerInfo.snapshot.queryParams["id"];
    if( ! this.commonUtil.isNull(id)){
        this.select(id);
    }
  }

  select(id:number){
    this.orderService.select(id)
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          this.orderVo = res.data;
          this.orderItemList = this.orderVo.orderItemList;
          this.shipping = this.orderVo.shipping;
        }
      });
  }

  goBack() {
    history.go(-1);
  }

  /**
   * 发货
   */
  shipment(id:number) {
    let order = new Order();
    order.id = id;
    this.orderService.shipment(order)
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          this.select(id);
        }
      });
  }
}
