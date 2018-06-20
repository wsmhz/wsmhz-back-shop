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
                  $.fn.zTree.getZTreeObj(treeId).checkNode(treeNode,true);
                // this.selectResource(event, treeId, treeNode);
              },
              onCheck: (event, treeId, treeNode)=> {
                $.fn.zTree.getZTreeObj(treeId).checkNode(treeNode,true);
                // this.selectResource(event, treeId, treeNode);
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



  // 选中角色组显示对应的菜单
  // selectResource(event, treeId, treeNode) {
  //   $.fn.zTree.getZTreeObj("role").checkNode(treeNode,true);
  //   this.roleService.selectAllResourceByRole(treeNode.id)
  //     .then(res => {
  //       if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
  //         let resourceTree = $.fn.zTree.getZTreeObj("resource");
  //         resourceTree.checkAllNodes(false);
  //         this.deepSelect(resourceTree,res.data);
  //       }
  //     });
  // }

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
        i === nodes.length - 1 ? roleIds += nodes[i].id : roleIds = roleIds + nodes[i].id + ",";
      }
      this.adminService.assignRoles(this.admin.id,roleIds);
    }
  }



}
