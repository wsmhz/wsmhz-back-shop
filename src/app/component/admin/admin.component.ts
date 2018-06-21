import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {CommonConfig} from '../../config/commonConfig';
import {CommonUtil} from '../../utils/commonUtil';
import {Admin, AdminPwd, AdminService} from '../../service/admin/admin.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {equalValidator} from '../../validators/validator';
import {tableRefresh, tableSelectRow} from '../../utils/functions/functionUtil';
import {Router} from '@angular/router';

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

  url = "admin/page";
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
  pwdForm: FormGroup;
  admin = new Admin();
  adminPwd = new AdminPwd();
  showpwd = false;
  constructor(
    private datePipe:DatePipe,
    private adminService : AdminService,
    private commonConfig : CommonConfig,
    private commonUtil : CommonUtil,
    private router:Router
  ) {
    this.adminForm = new FormBuilder().group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.pwdForm = new FormBuilder().group({
      oldpassword: ['', [Validators.required,Validators.minLength(6)]],
      passwordsGroup: new FormBuilder().group({
        password: ['', [Validators.required,Validators.minLength(6)]],
        pconfirm: ['']
      }, {validator: equalValidator})
    });
  }

  ngOnInit() {}

  search(){
    $('#dataTable').bootstrapTable('refresh',{
      query:{
        username:this.username,
        status:this.status
      }
    });
  }

  delete(){
    let selectRow= tableSelectRow();
    if( selectRow.length !== 0){
      if(window.confirm("确定要删除吗？")){
        this.adminService.delete(selectRow[0].id)
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
    this.admin = new Admin();
    this.title = "新建管理员";
    this.showpwd = true;
    $("#adminModal").modal('show');
  }

  edit(){
    this.showpwd = false;
    let selectRow= tableSelectRow();
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
    let flag = this.adminForm.valid;
    if( ! this.showpwd){ // 编辑
        if(this.adminForm.get("username").valid){
          this.admin.password = null;
          this.adminService.update(this.admin)
            .then(res => {
              if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
                $("#adminModal").modal('hide');
                tableRefresh();
              }
            });
          return;
        }
    }
    if (flag) {// 新增
      this.adminService.insert(this.admin)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            $("#adminModal").modal('hide');
            tableRefresh();
          }
        });
    }
  }

  pwd(){
    this.admin = new Admin();
    this.adminPwd = new AdminPwd();
    let selectRow= tableSelectRow();
    if( selectRow.length !== 0){
      this.admin.id = selectRow[0].id;
      this.title = "修改密码";
      $("#pwdModal").modal('show');
    }else{
      this.commonUtil.toastr_warning("请选取要编辑的数据行");
    }
  }

  modifyPwd(){
    if(this.pwdForm.valid){
      this.adminService.modifyPwd(this.adminPwd,this.admin.id)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            $("#pwdModal").modal('hide');
          }
        });
    }
  }

  viewHandler(id:number){
    this.router.navigate(['home/admin/adminDetail'],{ queryParams: { "id": id} });
  }

}
