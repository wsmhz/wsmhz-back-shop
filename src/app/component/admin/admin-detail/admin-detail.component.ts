import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoleService} from '../../../service/role/role.service';
import {tableRefresh} from '../../../utils/functions/functionUtil';
import {CommonConfig} from '../../../config/commonConfig';
import {ResourceService} from '../../../service/resource/resource.service';
declare let $:any;
@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css'],
  providers:[
    RoleService,
    ResourceService
  ]
})
export class AdminDetailComponent implements OnInit {

  adminId :number;
  constructor(
    private routerInfo:ActivatedRoute,
    private roleService:RoleService,
    private resourceService:ResourceService,
    private commonConfig:CommonConfig
  ) {}

  ngOnInit() {
    this.routerInfo.queryParams.subscribe((params) => this.adminId = params.id);
    this.initRoleTree();
    this.initResourceTree();
  }

  /*初始化角色组树*/
  initRoleTree() {
    this.roleService.selectAllRole()
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          let role_setting = {
            check: {
              enable: true,
              chkStyle: "checkbox"
            },
            data : {
              simpleData : {
                enable : true,
                pIdKey : "parentId" 		// 很关键
              },
              key : {
                name : "name"
              }
            },
            callback : {
              onClick : function(event, treeId, treeNode) {
                $.fn.zTree.getZTreeObj(treeId).checkNode(treeNode,true);
                // selectmenu(event, treeId, treeNode);
              },
              onCheck: function(event, treeId, treeNode) {
                // selectmenu(event, treeId, treeNode);
              },
              // onRightClick : RoleRightClick
            }
          };
          res.data.splice(0,0,{id:0,name:"角色组",open:true,"nocheck":true});
          $.fn.zTree.init($("#role"), role_setting, res.data);
        }
      });
  }

  /*初始化资源树*/
  initResourceTree() {
    this.resourceService.selectAllResource()
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            let menu_setting = {
              check: {
                enable: true,
                chkStyle: "checkbox"
              },
              data : {
                simpleData : {
                  enable : true,
                  pIdKey : "parentId" 		// 很关键
                },
                key : {
                  name : "name"
                },
                keep: {
                  parent: true
                }
              },
              callback : {
                onClick : function(event, treeId, treeNode) {
                   $.fn.zTree.getZTreeObj(treeId).checkNode(treeNode,true);
                   event.preventDefault();	// 阻止点击子菜单url跳转
                },
                // onRightClick : MenuRightClick
              }
            };
            $.fn.zTree.init($("#resource"), menu_setting, res.data).expandAll(true);
        }
      });
  }





}
