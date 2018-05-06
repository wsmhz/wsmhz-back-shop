import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/common/http-service';
import {CommonUtil} from '../../utils/commonUtil';
import {CommonConfig} from '../../config/commonConfig';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers:[

  ]
})
export class SidebarComponent implements OnInit {

  adminInfo = this.commonUtil.getAdminInfo();
  menus = [];
  constructor(
    private httpService:HttpService,
    private commonUtil:CommonUtil,
    private commonConfig:CommonConfig
  ) {}

  ngOnInit() {
    this.load();
  }

  load(){
    this.httpService.HttpGet("admin/"+this.adminInfo.id+"/resource")
      .then(res=>{
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          this.menus = res.data;
        }
      });
  }



}
