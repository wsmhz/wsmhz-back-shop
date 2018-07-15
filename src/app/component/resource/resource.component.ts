import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {CommonConfig} from '../../config/commonConfig';
import {Router} from '@angular/router';
import {CommonUtil} from '../../utils/commonUtil';
import {tableRefresh, tableSelectRow} from '../../utils/functions/functionUtil';
import {Resource, ResourceService} from '../../service/resource/resource.service';

declare var $:any;
@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
  providers:[
    DatePipe,
    ResourceService
  ]
})
export class ResourceComponent implements OnInit {
  url = "manage/resource/page";
  columns =  [{
    checkbox: true
  }, {
    field: 'name',
    title: '资源名称',
    align: 'center',
  }, {
    field: 'url',
    title: '资源链接',
    align: 'center',
  }, {
    field: 'icon',
    title: '图标',
    align: 'center',
  }, {
    field: 'type',
    title: '类型',
    align: 'center',formatter:value=>{
      if(value === "MENU"){
        return "菜单";
      }if(value === "LINK"){
        return "链接";
      }
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

  title = "";
  resourceForm: FormGroup;
  insertFlag = true;
  resource = new Resource();
  resourceList = [];
  constructor(
    private datePipe:DatePipe,
    private commonConfig : CommonConfig,
    private commonUtil : CommonUtil,
    private router:Router,
    private resourceService:ResourceService
  ) {
    this.resourceForm = new FormBuilder().group({
      name: ['', Validators.required],
      parentId: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  getResourceList(){
    this.resourceService.selectAllResource()
      .then(response => {
        if(response.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          this.resourceList = response.data;
        }
      });
  }

  delete(){
    let selectRow= tableSelectRow();
    if( selectRow.length !== 0){
      if(window.confirm("确定要删除吗？")){
        this.resourceService.delete(selectRow[0].id)
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
    let valid = this.resourceForm.valid;
    if(valid){
      if(this.insertFlag){// 新增
        this.resourceService.insert(this.resource)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
              $("#resourceModal").modal('hide');
              tableRefresh();
            }
          });
      }else{  // 编辑
        this.resourceService.update(this.resource)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
              $("#resourceModal").modal('hide');
              tableRefresh();
            }
          });
      }
    }
  }

  add(){
    this.resource = new Resource();
    this.title = "新建资源";
    this.insertFlag = true;
    this.getResourceList();
    $("#resourceModal").modal('show');
  }

  edit(){
    let selectRow= tableSelectRow();
    if( selectRow.length !== 0){
      this.resourceService.select(selectRow[0].id)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            this.resource = res.data;
            this.title = "编辑资源";
            this.insertFlag = false;
            this.getResourceList();
            $("#resourceModal").modal('show');
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
