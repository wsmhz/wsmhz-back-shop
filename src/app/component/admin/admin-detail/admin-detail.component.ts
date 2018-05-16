import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoleService} from '../../../service/role/role.service';
import {tableRefresh} from '../../../utils/functions/functionUtil';
import {CommonConfig} from '../../../config/commonConfig';
import {ResourceService} from '../../../service/resource/resource.service';
import {Admin, AdminService} from '../../../service/admin/admin.service';
import {CommonUtil} from '../../../utils/commonUtil';
declare let $:any;
@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css'],
  providers:[
    AdminService,
    RoleService,
    ResourceService
  ]
})
export class AdminDetailComponent implements OnInit {

  admin = new Admin();
  constructor(
    private routerInfo:ActivatedRoute,
    private adminService:AdminService,
    private roleService:RoleService,
    private resourceService:ResourceService,
    private commonConfig:CommonConfig,
    private commonUtil:CommonUtil
  ) {}

  ngOnInit() {
    let id = this.routerInfo.snapshot.queryParams["id"];
    if( ! this.commonUtil.isNull(id)){
      this.adminService.select(id)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            this.admin = res.data;
            this.initRoleTree();
            this.initResourceTree();
          }
        });
    }
  }

  /*初始化角色组树*/
  initRoleTree() {
    this.roleService.selectAllRole()
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          let role_setting = {
            check: {
              enable: true,
              idKey: "id",
              chkStyle: "radio"
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
              onClick : (event, treeId, treeNode)=> {
                this.selectResource(event, treeId, treeNode);
              },
              onCheck: (event, treeId, treeNode)=> {
               this.selectResource(event, treeId, treeNode);
              }
            }
          };
          res.data.splice(0,0,{id:0,name:"角色组",open:true,"nocheck":true});
          $.fn.zTree.init($("#role"), role_setting, res.data);

          for (let roleId of this.admin.roleIdList) {
            let roleTree = $.fn.zTree.getZTreeObj("role");
            roleTree.checkNode(roleTree.getNodeByParam("id",roleId),true);
          }
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
                idKey: "id",
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
                   $.fn.zTree.getZTreeObj(treeId).checkNode(treeNode,true,true);
                   event.preventDefault();	// 阻止点击子菜单url跳转
                },
                onCheck: (event, treeId, treeNode)=> {
                  $.fn.zTree.getZTreeObj(treeId).checkNode(treeNode,true,true);
                  event.preventDefault();	// 阻止点击子菜单url跳转
                }
              }
            };
            $.fn.zTree.init($("#resource"), menu_setting, res.data).expandAll(true);

            for (let resourceId of this.admin.resourceIdList) {
              let resourceTree = $.fn.zTree.getZTreeObj("resource");
              resourceTree.checkNode(resourceTree.getNodeByParam("id",resourceId),true,true);
            }
        }
      });
  }

  // 选中角色组显示对应的菜单
  selectResource(event, treeId, treeNode) {
    $.fn.zTree.getZTreeObj("role").checkNode(treeNode,true);
      this.roleService.selectAllResourceByRole(treeNode.id)
        .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          let resourceTree = $.fn.zTree.getZTreeObj("resource");
          resourceTree.checkAllNodes(false);
          for (let resource of res.data) {
            resourceTree.checkNode(resourceTree.getNodeByParam("id",resource.id), true,true);
          }
        }
      });
  }

  assignRoles() {
    let roleTree = $.fn.zTree.getZTreeObj("role");
    let nodes = roleTree.getCheckedNodes();
    if (nodes.length === 0) {
      this.commonUtil.toastr_warning("未选中角色");
    } else if (nodes[0].id === 0) {
      this.commonUtil.toastr_warning("无效的角色");
    } else {
      let roleIds = "";
      for (let i = 0; i < nodes.length; i++) {
        i === nodes.length - 1 ? roleIds = nodes[i].id : roleIds = nodes[i].id + ",";
      }
      this.adminService.assignRoles(this.admin.id,roleIds);
    }
  }

  assignResources(){
    let roleTree = $.fn.zTree.getZTreeObj("role");
    let roleNodes = roleTree.getCheckedNodes();
    if (roleNodes.length !== 1) {
      this.commonUtil.toastr_warning("请选中一位角色");
      return;
    }
    let resourceTree = $.fn.zTree.getZTreeObj("resource");
    let nodes = resourceTree.getCheckedNodes();
    console.log(nodes);
    if (nodes.length === 0) {
      this.commonUtil.toastr_warning("未选中资源");
    }else {
      let resourceIds = "";
      for (let i = 0; i < nodes.length; i++) {
        i === nodes.length - 1 ? resourceIds = nodes[i].id : resourceIds = nodes[i].id + ",";
      }
      this.roleService.assignResources(roleNodes[0].id,resourceIds);
    }
  }

}
