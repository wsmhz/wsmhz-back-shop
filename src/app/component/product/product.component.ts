import {Component, OnInit} from '@angular/core';
import {CommonConfig} from '../../config/commonConfig';
import {Router} from '@angular/router';
import {CommonUtil} from '../../utils/commonUtil';
import {DatePipe} from '@angular/common';
import {tableRefresh, tableSelectRow} from '../../utils/functions/functionUtil';
import {Product, ProductService} from '../../service/product/product.service';
import {CategoryService} from '../../service/category/category.service';

declare var $:any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[
    DatePipe,
    ProductService,
    CategoryService
  ]
})
export class ProductComponent implements OnInit {
  url = "manage/product/page";
  columns =  [{
    checkbox: true
  }, {
    field: 'name',
    title: '产品名称',
    align: 'center',
  }, {
    field: 'subtitle',
    title: '子标题',
    align: 'center',
  }, {
    field: 'price',
    title: '价格',
    align: 'center',
  }, {
    field: 'stock',
    title: '库存',
    align: 'center',
  }, {
    field: 'status',
    title: '状态',
    align: 'center',
    formatter:value=>{
      if(value === "ON_SALE"){
        return "在售";
      }else{
        return "下架";
      }
    },
    cellStyle : (value, row, index) =>{
      return {
        css : {
          "color" : "orange"
        }
      };
    },
  }, {
    field: 'flag',
    title: '标识',
    align: 'center',
    formatter:value=>{
      if(value === "HOT"){
        return "热销";
      }
    },
    cellStyle : (value, row, index) =>{
      return {
        css : {
          "color" : "red"
        }
      };
    },
  }, {
    field: 'createDate',
    title: '创建时间',
    align: 'center',
    formatter:value=>{
      return this.datePipe.transform(value, this.commonUtil.getDateFormatter());
    }
  }, {
    field: 'updateDate',
    title: '更新时间',
    align: 'center',
    formatter:value=>{
      return this.datePipe.transform(value, this.commonUtil.getDateFormatter());
    }
  }];

  name = ""; // 查询字段
  status  = "ON_SALE";// 查询字段
  categoryId :number;// 查询字段
  flag = "";// 查询字段
  categoryList = [];
  product = new Product();
  constructor(
    private datePipe:DatePipe,
    private commonConfig : CommonConfig,
    private commonUtil : CommonUtil,
    private router:Router,
    private productService:ProductService,
    private categoryService:CategoryService
  ) { }

  ngOnInit() {
    this.getCategoryList();
  }

  getCategoryList(){
    this.categoryService.selectAll()
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          this.categoryList = res.data;
        }
      });
  }

  delete(){
    let selectRow= tableSelectRow();
    if( selectRow.length !== 0){
      if(window.confirm("确定要删除吗？")){
        this.productService.delete(selectRow[0].id)
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

  add(){
    this.router.navigate(['home/product/productDetail'],{queryParams:{"insertFlag":true}});
  }

  onSale(){
    this.changeStatus('ON_SALE');
  }

  offSale(){
    this.changeStatus('OFF_SALE');
  }

  changeStatus(status){
    if(window.confirm("确定要修改该产品状态吗？")){
      let selectRow= tableSelectRow();
      if( selectRow.length !== 0){
        this.product = new Product();
        this.product.id = selectRow[0].id;
        this.product.status = status;
        console.log(this.product);
        this.productService.update(this.product)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
                tableRefresh();
            }
          });
      }else{
        this.commonUtil.toastr_warning("请选取要编辑的数据行");
      }
    }
  }

  viewHandler(id:number){
    this.router.navigate(['home/product/productDetail'],{ queryParams: { "id": id,"insertFlag":false} });
  }

  search(){
    $('#dataTable').bootstrapTable('refresh',{
      query:{
        name:this.name,
        status:this.status,
        categoryId:this.categoryId,
        flag:this.flag
      }
    });
  }

}
