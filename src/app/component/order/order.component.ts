import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {CommonUtil} from '../../utils/commonUtil';
import {CommonConfig} from '../../config/commonConfig';
import {tableRefresh, tableSelectRow} from '../../utils/functions/functionUtil';
import {OrderService} from '../../service/order/order.service';

declare var $:any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers:[
    DatePipe,
    OrderService
  ]
})
export class OrderComponent implements OnInit {

  url = "manage/order/page";
  columns =  [{
    checkbox: true
  }, {
    field: 'orderNo',
    title: '订单编号',
    align: 'center',
  },{
    field: 'orderItemList',
    title: '商品图片',
    align: 'center',
    formatter:value=>{
      let img = '';
      for (let orderItem of value) {
        img = img + '<img  src='+orderItem.productImage+' style="width:25px;height:25px;margin-top:5px;" ><br>';
      }
      return img;
    }
  }, {
    field: 'payment',
    title: '支付金额',
    align: 'center',
  }, {
    field: 'paymentTypeDesc',
    title: '支付类型',
    align: 'center',
  }, {
    field: 'statusDesc',
    title: '状态',
    align: 'center',
    cellStyle : (value, row, index) =>{
      if(value === '已取消'){
        return {
          css : {
            "color" : "orange"
          }
        };
      }else  if(value === '未支付'){
        return {
          css : {
            "color" : "red"
          }
        };
      }else  if(value === '已付款'){
        return {
          css : {
            "color" : "green"
          }
        };
      }else  if(value === '已发货'){
        return {
          css : {
            "color" : "blue"
          }
        };
      }else  if(value === '订单完成'){
        return {
          css : {
            "color" : "blank"
          }
        };
      }else{
        return {
          css : {
            "color" : "gray"
          }
        };
      }

    },
  }, {
    field: 'shipping.receiverName',
    title: '收件人',
    align: 'center',
  }, {
    field: 'createTime',
    title: '创建时间',
    align: 'center',
    formatter:value=>{
      return this.datePipe.transform(value, this.commonUtil.getDateFormatter());
    }
  }];

  orderNo = ""; // 查询字段
  status  = "";// 查询字段
  constructor(
    private datePipe:DatePipe,
    private commonConfig : CommonConfig,
    private commonUtil : CommonUtil,
    private router:Router,
    private orderService:OrderService
  ) { }

  ngOnInit() {
  }

  search(){
    $('#dataTable').bootstrapTable('refresh',{
      query:{
        orderNo:this.orderNo,
        status:this.status,
      }
    });
  }

  delete(){
    let selectRow= tableSelectRow();
    if( selectRow.length !== 0){
      if(window.confirm("确定要删除吗？")){
        this.orderService.delete(selectRow[0].id)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
              tableRefresh();
            }
          });
      }
    }else{
      this.commonUtil.toastr_warning("请选取要删除的数据行");
    }
  }

  viewHandler(id:number){
    this.router.navigate(['home/order/orderDetail'],{ queryParams: { "id": id} });
  }

}
