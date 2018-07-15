import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/common/http-service';
import {CommonUtil} from '../../utils/commonUtil';
import {CommonConfig} from '../../config/commonConfig';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AdminService} from '../../service/admin/admin.service';

declare var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers:[
    AdminService
  ]
})
export class SidebarComponent implements OnInit {

  adminInfo = this.commonUtil.getAdminInfo();
  menus = [];
  constructor(
    private commonUtil:CommonUtil,
    private commonConfig:CommonConfig,
    private adminService:AdminService
  ) {}

  ngOnInit() {
    this.load();
  }

  showSub(index:number){
    let display = $(".sub"+index).css("display");
    if(display === "none"){
      $(".sub"+index).css("display","block");
    }else{
      $(".sub"+index).css("display","none");
    }

  }

  showSubSub(index:number){
    let display = $(".subsub"+index).css("display");
    if(display === "none"){
      $(".subsub"+index).css("display","block");
    }else{
      $(".subsub"+index).css("display","none");
    }


  }

  load(){
    this.adminService.loadMenuTree(this.adminInfo.id)
      .then(res=>{
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          this.menus = res.data;
        }
      });
  }



}
