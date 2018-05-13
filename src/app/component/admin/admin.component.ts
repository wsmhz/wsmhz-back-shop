import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {CommonConfig} from '../../config/commonConfig';
import {CommonUtil} from '../../utils/commonUtil';
import {Admin, AdminService} from '../../service/admin/admin.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare let $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers:[
    DatePipe,
    AdminService
  ]
})
export class AdminComponent implements OnInit {

  url = "admin";
  columns =  [{
    checkbox: true
  }, {
    field: 'username',
    title: '账号',
    align: 'center',
  }, {
    field: 'phone',
    title: '手机号',
    align: 'center',
  }, {
    field: 'email',
    title: '邮箱',
    align: 'center',
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

  username = ""; // 查询字段
  status = true;// 查询字段
  title = '';
  adminForm: FormGroup;
  admin = new Admin();
  constructor(
    private datePipe:DatePipe,
    private adminService : AdminService,
    private commonConfig : CommonConfig,
    private commonUtil : CommonUtil
  ) {
    this.adminForm = new FormBuilder().group({
      username: ['', Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {

  }

  search(){
    $('#dataTable').bootstrapTable('refresh',{
      query:{
        username:this.username,
        status:this.status
      }
    });
  }

  delete(){
    let selectRow= $('#dataTable').bootstrapTable('getSelections');
    if( selectRow.length !== 0){
      if(window.confirm("确定要删除吗？")){
        this.adminService.delete(selectRow[0].id)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
              $('#dataTable').bootstrapTable('refresh');
            }
          });
      }
    }else{
      this.commonUtil.toastr_warning("请选取要删除的数据行");
    }
  }

  add(){
    this.admin = new Admin();
    this.title = "新建管理员";
    $("#adminModal").modal('show');
  }

  edit(){
    let selectRow= $('#dataTable').bootstrapTable('getSelections');
    if( selectRow.length !== 0){
        this.adminService.select(selectRow[0].id)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
                this.admin = res.data;
                this.title = "编辑管理员";
                $("#adminModal").modal('show');
            }
          });
    }else{
      this.commonUtil.toastr_warning("请选取要编辑的数据行");
    }

  }

  save(){
    if (this.adminForm.valid) {
      this.adminService.insert(this.admin)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            $("#adminModal").modal('hide');
          }
        });
    }
  }

  viewHandler(event:number){
    alert(event);
  }

}
