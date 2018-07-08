import { Component, OnInit } from '@angular/core';
import {ResourceService} from "../../../service/resource/resource.service";
import {CommonConfig} from "../../../config/commonConfig";
import {CommonUtil} from "../../../utils/commonUtil";
import {RoleService} from "../../../service/role/role.service";
import {ActivatedRoute} from "@angular/router";
import {treeDeepSelect} from '../../../utils/functions/functionUtil';

declare let $:any;
@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css'],
  providers:[
    ResourceService,
    RoleService
  ]
})
export class RoleDetailComponent implements OnInit {

  resourceList:any;
  roleId :number;
  constructor(
    private routerInfo:ActivatedRoute,
    private resourceService:ResourceService,
    private commonConfig:CommonConfig,
    private commonUtil:CommonUtil,
    private roleService:RoleService,
  ) { }

  ngOnInit() {
    this.roleId = this.routerInfo.snapshot.queryParams["id"];
    if( ! this.commonUtil.isNull(this.roleId)){
      this.roleService.selectAllResourceByRole(this.roleId)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            this.resourceList = res.data;
            this.initResourceTree();
          }
        });
    }
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

          let resourceTree = $.fn.zTree.getZTreeObj("resource");
          treeDeepSelect(resourceTree,this.resourceList);
        }
      });
  }

  assignResources(){
    let resourceTree = $.fn.zTree.getZTreeObj("resource");
    let nodes = resourceTree.getCheckedNodes();
    if (nodes.length === 0) {
      this.commonUtil.toastr_warning("未选中资源");
    }else {
      let resourceIds = "";
      for (let i = 0; i < nodes.length; i++) {
        i === nodes.length - 1 ? resourceIds += nodes[i].id : resourceIds = resourceIds + nodes[i].id + ",";
      }
      this.roleService.assignResources(this.roleId,resourceIds);
    }
  }

}
