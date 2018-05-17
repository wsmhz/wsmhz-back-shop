import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {CommonUtil} from '../../utils/commonUtil';
import {CommonConfig} from '../../config/commonConfig';
import {Router} from '@angular/router';
import {tableRefresh, tableSelectRow} from '../../utils/functions/functionUtil';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Role, RoleService} from '../../service/role/role.service';

declare var $:any;
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  providers:[
    DatePipe,
    RoleService
  ]
})
export class RoleComponent implements OnInit {
  url = "role/page";
  columns =  [{
    checkbox: true
  }, {
    field: 'name',
    title: '角色名称',
    align: 'center',
  }, {
    field: 'description',
    title: '描述',
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

  title = "";
  roleForm: FormGroup;
  role = new Role();
  insertFlag = true;
  constructor(
    private datePipe:DatePipe,
    private commonConfig : CommonConfig,
    private commonUtil : CommonUtil,
    private router:Router,
    private roleService:RoleService
  ) {
    this.roleForm = new FormBuilder().group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {

  }


  delete(){
    let selectRow= tableSelectRow();
    if( selectRow.length !== 0){
      if(window.confirm("确定要删除吗？")){
        this.roleService.delete(selectRow[0].id)
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
    let valid = this.roleForm.valid;
    if(valid){
      if(this.insertFlag){// 新增
        this.roleService.insert(this.role)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
              $("#roleModal").modal('hide');
              tableRefresh();
            }
          });
      }else{  // 编辑
        this.roleService.update(this.role)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
              $("#roleModal").modal('hide');
              tableRefresh();
            }
          });
      }
    }
  }

  add(){
    this.role = new Role();
    this.title = "新建角色";
    this.insertFlag = true;
    $("#roleModal").modal('show');
  }

  edit(){
    let selectRow= tableSelectRow();
    if( selectRow.length !== 0){
        this.roleService.select(selectRow[0].id)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
              this.role = res.data;
              this.title = "编辑角色";
              this.insertFlag = false;
              $("#roleModal").modal('show');
            }
          });
    }else{
      this.commonUtil.toastr_warning("请选取要编辑的数据行");
    }
  }

  viewHandler(id:number){
    this.router.navigate(['home/adminDetail'],{ queryParams: { "id": id} });
  }

}
