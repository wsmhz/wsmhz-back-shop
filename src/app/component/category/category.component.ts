import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonConfig} from '../../config/commonConfig';
import {CommonUtil} from '../../utils/commonUtil';
import {DatePipe} from '@angular/common';
import {tableRefresh, tableSelectRow} from '../../utils/functions/functionUtil';
import {Category, CategoryService} from '../../service/category/category.service';

declare var $:any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[
    CategoryService,
    DatePipe
  ]
})
export class CategoryComponent implements OnInit {
  url = "manage/category/page";
  columns =  [{
    checkbox: true
  }, {
    field: 'name',
    title: '分类名称',
    align: 'center',
  }, {
    field: 'status',
    title: '状态',
    align: 'center',
    formatter:value=>{
      if(value === true){
        return "启用";
      }else{
        return "禁用";
      }
    }
  }, {
    field: 'sortOrder',
    title: '排序',
    align: 'center',
  },{
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

  title = "";
  categoryForm: FormGroup;
  category = new Category();
  insertFlag = true;
  categoryList = [];
  constructor(
    private datePipe:DatePipe,
    private commonConfig : CommonConfig,
    private commonUtil : CommonUtil,
    private router:Router,
    private categoryService:CategoryService
  ) {
    this.categoryForm = new FormBuilder().group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
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
        this.categoryService.delete(selectRow[0].id)
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

  save(){
    let valid = this.categoryForm.valid;
    if(valid){
      if(this.insertFlag){// 新增
        this.categoryService.insert(this.category)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
              $("#categoryModal").modal('hide');
              tableRefresh();
            }
          });
      }else{  // 编辑
        this.categoryService.update(this.category)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
              $("#categoryModal").modal('hide');
              tableRefresh();
            }
          });
      }
    }
  }

  add(){
    this.category = new Category();
    this.title = "新建分类";
    this.insertFlag = true;
    this.getCategoryList();
    $("#categoryModal").modal('show');
  }

  edit(){
    let selectRow= tableSelectRow();
    if( selectRow.length !== 0){
      this.categoryService.select(selectRow[0].id)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            this.category = res.data;
            this.title = "编辑分类";
            this.insertFlag = false;
            this.getCategoryList();
            $("#categoryModal").modal('show');
          }
        });
    }else{
      this.commonUtil.toastr_warning("请选取要编辑的数据行");
    }
  }

  viewHandler(id:number){
    // this.router.navigate(['home/roleDetail'],{ queryParams: { "id": id} });
  }

}
