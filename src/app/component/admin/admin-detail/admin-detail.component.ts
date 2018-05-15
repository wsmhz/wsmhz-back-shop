import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
declare let $:any;
@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {

  adminId :number;
  constructor(
    private routerInfo:ActivatedRoute
  ) {}

  ngOnInit() {
    this.routerInfo.queryParams.subscribe((params) => this.adminId = params.id);
    this.initRoleTree();
  }

  /*初始化角色组树*/
  initRoleTree() {
    $.ajax({
      url:"admin/"+this.adminId+"/role",
      type:'get',
      success:(data:any)=>{
        let role_setting = {
          check: {
            enable: true,
            chkStyle: "radio"
          },
          data : {
            simpleData : {
              enable : true
            },
            key : {
              name : "name"
            }
          },
          callback : {
            onClick : function(event, treeId, treeNode) {
              // selectmenu(event, treeId, treeNode);
            },
            onCheck: function(event, treeId, treeNode) {
              // selectmenu(event, treeId, treeNode);
            },
            // onRightClick : RoleRightClick
          }
        };
        // data.push({id:0,roleName:"角色组",open:true,"nocheck":true});
        $.fn.zTree.init($("#role"), role_setting, data.data);
      },
      erro:(e)=>{
        alert(e);
      }
    });
  }

}
